import * as vscode from 'vscode';
import { pickSboxProcess } from './pickProcess';

export async function attachDebugger() {
    const sboxPid = await pickSboxProcess();
    
    if (!sboxPid) {
        vscode.window.showWarningMessage('Couldn\'t find a running S&box process');
        return;
    }

    vscode.debug.startDebugging(undefined, {
        type: 'coreclr',
        name: 'S&box Attach',
        request: 'attach',
        processId: sboxPid,
    });
}
