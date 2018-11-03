import * as taskLib from 'vsts-task-lib/task';
import * as toolLib from 'vsts-task-tool-lib/tool';
import * as os from 'os';

async function run() {
    try {
        let version = taskLib.getInput('version', true);
        await getNode(version);
    }
    catch (error) {
        console.log(error.message)
        taskLib.setResult(taskLib.TaskResult.Failed, error.message);
    }
}

async function getNode(version: string) {
    // check cache
    let toolPath: string = toolLib.findLocalTool('warp-packer', version);

    if (!toolPath) {
        toolPath = await acquireNode(version);
    }
    toolLib.prependPath(toolPath);
}

async function acquireNode(version: string): Promise<string> {
    version = toolLib.cleanVersion(version);
    let downloadUrl = downloadLink(version, os.platform())
    let downloadPath = await toolLib.downloadTool(downloadUrl);    
    return await toolLib.cacheFile('warp-packer', 'warp-packer', version, 'warp-packer');
}

run();

export default function downloadLink(version: string, os: string): string {
    let warp : { [key:string]:string; } = {};
    warp["win32"] = "windows-x64.warp-packer.exe";
    warp["linux"] = "linux-x64.warp-packer";
    warp["darwin"] = "macos.warp-packer"; 
    return `https://github.com/dgiagio/warp/releases/download/v${version}/${warp[os]}`;    
}