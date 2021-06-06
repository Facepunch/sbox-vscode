import * as vscode from 'vscode';
import { getProcesses } from './processTree';

interface SboxProcessMatch extends vscode.QuickPickItem {
    readonly pid: number;
    readonly command: string;
}

export async function pickSboxProcess() {
    const matches: SboxProcessMatch[] = [];
    await getProcesses((pid, ppid, command, args, date) => {
        const results = command.match(/(?<=[\/\\])sbox(?:-dev)?\.exe(?:$|\s)/);
        if (results && results.length >= 1) {
            matches.push({
                label: results[0],
                description: `pid: ${pid}`,
                pid,
                command,
            });
        }
    });
    
    if (matches.length === 0) {
        vscode.window.showWarningMessage('Couldn\'t find a running S&box process');
        return undefined;
    }

    if (matches.length === 1) {
        return matches[0].pid?.toString();
    }

    const options : vscode.QuickPickOptions = {
        placeHolder: 'Pick a S&box process',
        matchOnDescription: true,
        matchOnDetail: true,
        ignoreFocusOut: true,
    };

    const result = await vscode.window.showQuickPick(matches, options);
    return result?.pid?.toString();
}
