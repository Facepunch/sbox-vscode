import * as vscode from 'vscode';
import { pickSboxProcess } from './pickProcess';
import { attachDebugger } from './attachDebugger';
import { SboxDebugConfigProvider } from './debugConfigProvider';

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(
		vscode.commands.registerCommand('facepunch-sbox.pickProcess', pickSboxProcess),
		vscode.commands.registerCommand('facepunch-sbox.attachDebugger', attachDebugger),
		vscode.debug.registerDebugConfigurationProvider('sbox', new SboxDebugConfigProvider()),
	);
}

export function deactivate() {}
