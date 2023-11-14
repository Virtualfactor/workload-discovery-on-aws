// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import {describe, it, expect, vi, beforeEach, afterEach} from "vitest";
import {screen, within } from '@testing-library/react'
import {server} from "../../../../mocks/server";
import {graphql} from "msw";
import {TableWrapper} from '@cloudscape-design/components/test-utils/dom';
import {getAccounts} from '../../../../mocks/fixtures/getAccounts/default.json';
import userEvent from "@testing-library/user-event";
import {renderPolarisLayout} from "../../../testUtils";

function verifyBodyCells(expectedAccounts, table, rowNumber, index) {
    let accountInfo = expectedAccounts[index]
    expect(table.findBodyCell(rowNumber,2).getElement()?.innerHTML).toBe(accountInfo["accountId"])
    expect(table.findBodyCell(rowNumber,3).getElement()?.innerHTML).toBe(accountInfo["name"])
    expect(table.findBodyCell(rowNumber,4).getElement()?.innerHTML).toBe(accountInfo["regions"].length.toString())
}

async function getRegionsTable() {
    const regionsTable = await screen.findByRole('table', {name: /regions$/i});
    return new TableWrapper(regionsTable.parentElement);
}

describe('Discoverable Accounts Page', () => {

    beforeEach(() => {
        vi.mock('@aws-amplify/ui-react', async () => {
            const mod = await vi.importActual('@aws-amplify/ui-react');
            return {
                ...mod,
                useAuthenticator: () => ({ user: {
                        username: 'testUser'
                    }, signOut: vi.fn() }),
            };
        });
    });

    afterEach(() => {
        vi.resetAllMocks();
    });

    describe('Discoverable Accounts Table', () => {

        it('should display account data', async () => {
            window.perspectiveMetadata = {"crossAccountDiscovery": "SELF_MANAGED"};

            renderPolarisLayout();

            const group = screen.getByRole('group', {
                name: /configure/i,
                hidden: true
            });

            const accountsLink = within(group).getByRole('link', {
                name: /accounts/i,
                hidden: true
            });

            await userEvent.click(accountsLink);

            await screen.findByText('xxxxxxxxxxxx');

            expect(screen.getByRole('button', { name: /Import/ })).toBeVisible();

            const accountsTable = await screen.findByRole('table', {name: /accounts$/i});

            const table = new TableWrapper(accountsTable.parentElement);

            const tableRows = table.findRows();

            expect(tableRows).toHaveLength(2);

            // We pass index + 1 as the rowNumber because findBodyCell starts at index 1.
            tableRows.forEach(function (_, index) {
                verifyBodyCells(getAccounts, table, index + 1, index)
            });
        });

        it('should not have import button in Organizations mode', async () => {
            window.perspectiveMetadata = {"crossAccountDiscovery": "AWS_ORGANIZATIONS"};

            renderPolarisLayout();

            const group = screen.getByRole('group', {
                name: /configure/i,
                hidden: true
            });

            const accountsLink = within(group).getByRole('link', {
                name: /accounts/i,
                hidden: true
            });

            await userEvent.click(accountsLink);

            const importButton =  screen.queryByRole('button', { name: /Import/ });
            expect(importButton).toBeNull();
        });

        it('should import an account with one regions', async () => {
            const accounts = [];

            server.use(
                graphql.mutation('AddAccounts', async (req, res, ctx) => {
                    const reqAccounts = req.variables.accounts;
                    accounts.push(...reqAccounts);
                    return res(ctx.data({addAccounts: reqAccounts}));
                }),
                graphql.query('GetAccounts', (req, res, ctx) => {
                    return res(ctx.data({getAccounts: accounts}));
                })
            );

            window.perspectiveMetadata = {"crossAccountDiscovery": "SELF_MANAGED"};

            window.scrollTo = vi.fn();

            renderPolarisLayout();

            const group = screen.getByRole('group', {
                name: /configure/i,
                hidden: true
            });

            const accountsLink = within(group).getByRole('link', {
                name: /accounts/i,
                hidden: true
            });

            await userEvent.click(accountsLink);

            await userEvent.click(screen.getByRole('button', { name: /Import/ }));

            screen.getByRole('heading', {level: 2, name: /Import Method/});

            const formRadio = screen.getByRole('radio', {
                name: /add accounts & regions using a form\./i
            })

            await userEvent.click(formRadio);

            const accountCombo = screen.getByRole('combobox', { name: /account id/i });
            await userEvent.type(accountCombo, 'yyyyyyyyyyyy');

            const accountNameText = screen.getByRole('textbox', { name: /account name/i });
            await userEvent.type(accountNameText, 'test account');

            const regionButton = screen.getByRole('button', {name: /regions select regions/i});
            await userEvent.click(regionButton);

            const euWest1Option = screen.getByRole('option', {name: /europe \(ireland\)/i});
            await userEvent.click(euWest1Option);

            userEvent.click(screen.getByRole('button', {name: /add/i}));

            const importButton = within(screen.getByRole('main')).getByRole('button', {
                name: /import/i
            });

            userEvent.click(importButton);

            const dialog = screen.getByRole('dialog', {
                name: /import accounts and regions/i
            });

            const globalCheckBox = screen.getByRole('checkbox', {
                name: /the global resources template is deployed in each of the accounts being imported/i
            });
            userEvent.click(globalCheckBox);

            const regionalCheckBox = screen.getByRole('checkbox', {
                name: /the regional resources template is deployed in every region being imported for each of the listed accounts/i
            });
            userEvent.click(regionalCheckBox);

            userEvent.click(within(dialog).getByRole('button', {name: /import/i}));

            await screen.findByRole('heading', {level: 2, name: /Accounts$/});

            const accountsTable = await screen.findByRole('table', {name: /accounts$/i});

            const table = new TableWrapper(accountsTable.parentElement);

            const tableRows = table.findRows();

            expect(tableRows).toHaveLength(1);

            verifyBodyCells(accounts, table, 1, 0);
        }, {timeout: 10000});

        it('should import an account with multiple regions', async () => {
            const accounts = [];

            server.use(
                graphql.mutation('AddAccounts', async (req, res, ctx) => {
                    const reqAccounts = req.variables.accounts;
                    accounts.push(...reqAccounts);
                    return res(ctx.data({addAccounts: reqAccounts}));
                }),
                graphql.query('GetAccounts', (req, res, ctx) => {
                    return res(ctx.data({getAccounts: accounts}));
                })
            );

            window.perspectiveMetadata = {"crossAccountDiscovery": "SELF_MANAGED"};

            window.scrollTo = vi.fn();

            renderPolarisLayout();

            const group = screen.getByRole('group', {
                name: /configure/i,
                hidden: true
            });

            const accountsLink = within(group).getByRole('link', {
                name: /accounts/i,
                hidden: true
            });

            await userEvent.click(accountsLink);

            await userEvent.click(screen.getByRole('button', { name: /Import/ }));

            screen.getByRole('heading', {level: 2, name: /Import Method/});

            const formRadio = screen.getByRole('radio', {
                name: /add accounts & regions using a form\./i
            })

            await userEvent.click(formRadio);

            const accountCombo = screen.getByRole('combobox', { name: /account id/i });
            await userEvent.type(accountCombo, 'yyyyyyyyyyyy');

            const accountNameText = screen.getByRole('textbox', { name: /account name/i });
            await userEvent.type(accountNameText, 'test account');

            const regionButton = screen.getByRole('button', {name: /regions select regions/i});
            await userEvent.click(regionButton);

            const usEast1Option = screen.getByRole('option', {name: /us east \(n\. virginia\)/i});
            await userEvent.click(usEast1Option);

            const euWest1Option = screen.getByRole('option', {name: /europe \(ireland\)/i});
            await userEvent.click(euWest1Option);

            userEvent.click(screen.getByRole('button', {name: /add/i}));

            const importButton = within(screen.getByRole('main')).getByRole('button', {
                name: /import/i
            });

            userEvent.click(importButton);

            const dialog = screen.getByRole('dialog', {
                name: /import accounts and regions/i
            });

            const globalCheckBox = screen.getByRole('checkbox', {
                name: /the global resources template is deployed in each of the accounts being imported/i
            });
            userEvent.click(globalCheckBox);

            const regionalCheckBox = screen.getByRole('checkbox', {
                name: /the regional resources template is deployed in every region being imported for each of the listed accounts/i
            });
            userEvent.click(regionalCheckBox);

            userEvent.click(within(dialog).getByRole('button', {name: /import/i}));

            await screen.findByRole('heading', {level: 2, name: /Accounts$/});

            const accountsTable = await screen.findByRole('table', {name: /accounts$/i});

            const table = new TableWrapper(accountsTable.parentElement);

            const tableRows = table.findRows();

            expect(tableRows).toHaveLength(1);

            verifyBodyCells(accounts, table, 1, 0);
        }, 10000);

        it('should not allow account with no regions to be created', async () => {
            server.use(
                graphql.mutation('DeleteRegions', async (req, res, ctx) => {
                    return res(ctx.errors([
                        {message: 'Unable to delete region(s), an account must have at least one region.'}
                    ]));
                })
            );

            window.perspectiveMetadata = {"crossAccountDiscovery": "SELF_MANAGED"};

            window.scrollTo = vi.fn();

            renderPolarisLayout();

            const group = screen.getByRole('group', {
                name: /configure/i,
                hidden: true
            });

            const accountsLink = within(group).getByRole('link', {
                name: /accounts/i,
                hidden: true
            });

            await userEvent.click(accountsLink);

            await screen.findByText('xxxxxxxxxxxx');

            const accountsTable = await screen.findByRole('table', {name: /accounts$/i});

            const accountsTableWrapper = new TableWrapper(accountsTable.parentElement);

            const accountCheckmarkCell = accountsTableWrapper.findBodyCell(1,1).getElement();

            const accountCheckmark = within(accountCheckmarkCell).getByRole('checkbox')

            await userEvent.click(accountCheckmark);

            await screen.findByText('us-east-1');

            const regionsTableWrapper = await getRegionsTable();

            const regionsCheckmarkCell = regionsTableWrapper.findBodyCell(1,1).getElement();

            const regionsCheckmark = within(regionsCheckmarkCell).getByRole('checkbox');

            await userEvent.click(regionsCheckmark);

            const removeButton = await screen.getAllByRole('button', { name: /remove/i })[1]

            await userEvent.click(removeButton)

            const deleteButton = await screen.getAllByRole('button', { name: /delete/i })[1]

            await userEvent.click(deleteButton);

            const errorNotification = await screen.findByText(/the following errors occurred:/i);

            await within(errorNotification).getByText(/Unable to delete region\(s\), an account must have at least one region./i);

        });

        it('should be able to delete a region', async () => {
            const regionToRemove = 'us-east-2'

            let accountsDb = {
                xxxxxxxxxxxx: { accountId: 'xxxxxxxxxxxx', name: 'testAccount1', regions: [{name: 'us-east-2'}, {name:'us-east-1'}] } };
                
            server.use(
              graphql.query('GetResourcesRegionMetadata', (req, res, ctx) => {
                const accounts = req.variables.accounts;
                const resourceRegionMetadata = Object.entries(accountsDb)
                  .filter(([accountId]) => 
                     accounts.map((x) => x.accountId).includes(accountId)
                  )
                  .map(([accountId, account]) => {
                    return {
                      accountId,
                      count: 100,
                      regions: account.regions.map((region) => {
                        region.count = 100;
                        return region;
                      }),
                    };
                  });
                return res(
                  ctx.data({
                    getResourcesRegionMetadata: resourceRegionMetadata,
                  })
                );
              }),
              graphql.query('GetAccounts', (req, res, ctx) => {
                return res(ctx.data({ getAccounts: Object.values(accountsDb) }));
              })
            );
    
            window.perspectiveMetadata = {"crossAccountDiscovery": "SELF_MANAGED"};
    
            window.scrollTo = vi.fn();
    
            renderPolarisLayout();
    
            const group = screen.getByRole('group', {
                name: /configure/i,
                hidden: true
            });
    
            const accountsLink = within(group).getByRole('link', {
                name: /accounts/i,
                hidden: true
            });
    
            await userEvent.click(accountsLink);
    
            await screen.findByText('xxxxxxxxxxxx');
  
            const accountsTable = await screen.findByRole('table', {name: /accounts$/i});
    
            const accountsTableWrapper = new TableWrapper(accountsTable.parentElement);
    
            const tableRows = accountsTableWrapper.findRows();
    
            expect(tableRows).toHaveLength(1);
    
            const accountCheckmarkCell = accountsTableWrapper.findBodyCell(1,1).getElement();
    
            const accountCheckmark = within(accountCheckmarkCell).getByRole('checkbox')
    
            await userEvent.click(accountCheckmark);
    
            await screen.findByText(regionToRemove);
    
            let regionsTableWrapper = await getRegionsTable();

            expect(regionsTableWrapper.findRows()).toHaveLength(2); 
            
            const regionsCheckmarkCell = regionsTableWrapper.findBodyCell(1,1).getElement();
        
            const regionsCheckmark = within(regionsCheckmarkCell).getByRole('checkbox');
    
            await userEvent.click(regionsCheckmark);
    
            const removeButton = await screen.getAllByRole('button', { name: /remove/i })[1]
    
            await userEvent.click(removeButton)
    
            const deleteButton = await screen.getAllByRole('button', { name: /delete/i })[1]
    
            await userEvent.click(deleteButton);

            // Mock for DeleteRegions will not work here, so manually manipulating the data here
            Object.values(accountsDb).map(account => {
                account.regions = account.regions.filter(({name}) => name != regionToRemove);
            })

            // Forcing another GetResourcesRegionMetadata call to update data
            await userEvent.click(accountCheckmark);

            await userEvent.click(accountCheckmark);
    
            await screen.findByText('us-east-1');

            regionsTableWrapper = await getRegionsTable();

            expect(accountsTableWrapper.findBodyCell(1,4).getElement()?.innerHTML).toEqual('1')

            expect(regionsTableWrapper.findRows()).toHaveLength(1);

            expect(regionsTableWrapper.findBodyCell(1,2).getElement()?.innerHTML).toEqual('us-east-1');

            expect(regionsTableWrapper.findBodyCell(1,4).getElement()?.innerHTML).toEqual('100');
                
        }, 10000);
    });

});