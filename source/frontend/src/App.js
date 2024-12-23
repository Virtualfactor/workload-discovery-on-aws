// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import {
    Authenticator,
    Heading,
    Image,
    ThemeProvider,
    Button,
} from '@aws-amplify/ui-react';
import {Auth} from 'aws-amplify';
import '@cloudscape-design/global-styles/index.css';
import '@aws-amplify/ui-react/styles.css';
import Main from './Main';
import {Box, SpaceBetween} from '@cloudscape-design/components';
import * as awsui from '@cloudscape-design/design-tokens';

const components = {
    Header() {
        return (
            <Box
                margin={{vertical: 'm', horizontal: 'xl'}}
                textAlign={'center'}
            >
                <SpaceBetween size={'xl'}>
                    <Image
                        alt="Workload Discovery on AWS icon"
                        src="/icons/AWS-Zoom_light-bg.svg"
                        objectFit="initial"
                        objectPosition="50% 50%"
                        backgroundColor="initial"
                        height="120px"
                        width="120px"
                        opacity="100%"
                    />
                    <Heading level={3}>Workload Discovery on AWS</Heading>
                </SpaceBetween>
            </Box>
        );
    },
    Footer() {
        return window.amplify.Auth?.federatedIdpResource != null ? (
            <SpaceBetween size={'xs'}>
                <Box margin={{vertical: 'm'}} textAlign={'center'}>
                    <Button
                        align="center"
                        variation="primary"
                        onClick={() =>
                            Auth.federatedSignIn({
                                customProvider:
                                    window.amplify.Auth.federatedIdpResource,
                            })
                        }
                    >
                        {' '}
                        Sign in via Federated Identity Provider
                    </Button>
                </Box>
            </SpaceBetween>
        ) : null;
    },
};

export const App = () => {
    const theme = {
        name: 'theme',
        tokens: {
            fonts: {
                default: {
                    variable: {value: awsui.fontFamilyBase},
                    static: {value: awsui.fontFamilyBase},
                },
            },
            colors: {
                brand: {
                    primary: {
                        10: {value: awsui.colorBackgroundButtonPrimaryDisabled},
                        80: {value: awsui.colorBackgroundButtonPrimaryDefault},
                        90: {value: awsui.colorBackgroundButtonPrimaryHover},
                        100: {value: awsui.colorBackgroundButtonPrimaryActive},
                    },
                },
            },
        },
    };

    return (
        <ThemeProvider theme={theme}>
            <Authenticator components={components} hideSignUp={true}>
                <Main />
            </Authenticator>
        </ThemeProvider>
    );
};
export default App;
