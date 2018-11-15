import * as taskLib from 'azure-pipelines-task-lib/task';

async function run() : Promise<any> {
    let warpPacker = taskLib.tool('warp-packer');
    
    let arch = taskLib.getInput('architecture', true);
    warpPacker.arg(["--arch", arch]);
    
    let exec = taskLib.getInput('executableName', true);
    warpPacker.arg(["--exec", exec]);

    let inputDir = taskLib.getPathInput("inputDirectory", true);
    warpPacker.arg(["--input_dir", inputDir]);

    let output = taskLib.getInput("output", true);
    warpPacker.arg(["--output", output]);

    await warpPacker.exec();
}

run().then(_ =>
    taskLib.setResult(taskLib.TaskResult.Succeeded, "")
).catch(error =>
    taskLib.setResult(taskLib.TaskResult.Failed, error)
);