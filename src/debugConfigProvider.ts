import * as vscode from 'vscode';

export class SboxDebugConfigProvider implements vscode.DebugConfigurationProvider {
    public async provideDebugConfigurations(): Promise<vscode.DebugConfiguration[]> {
        return [
            {
                name: "Attach to S&box",
                type: "coreclr",
                request: "attach",
                processId: "${command:facepunch-sbox.pickProcess}",
            },
        ];
    }
}
