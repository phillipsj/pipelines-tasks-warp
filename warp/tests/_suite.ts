import tool from '../index';
import { expect } from 'chai';
import * as path from 'path';
import * as assert from 'assert';
import * as ttm from 'vsts-task-lib/mock-test';

describe('prepare download link', () => {
    it('constructs a link from version and os', () => {
        expect(tool('0.3.0', 'win32')).to.eq('https://github.com/dgiagio/warp/releases/download/v0.3.0/windows-x64.warp-packer.exe')
    });

    it('works for linux', () => {
        expect(tool('0.3.0', 'linux')).to.eq('https://github.com/dgiagio/warp/releases/download/v0.3.0/linux-x64.warp-packer')
    });

    it('works for mac', () => {
        expect(tool('0.3.0', 'darwin')).to.eq('https://github.com/dgiagio/warp/releases/download/v0.3.0/macos.warp-packer')
    });

    it('works for different version', () => {
        expect(tool('0.2.2', 'linux')).to.eq('https://github.com/dgiagio/warp/releases/download/v0.2.2/linux-x64.warp-packer')
    });

    it('should succeed with correct version', () => {      
    
        let tp = path.join(__dirname, 'success.js');
        let tr: ttm.MockTestRunner = new ttm.MockTestRunner(tp);
    
        tr.run();
        expect(tr.succeeded, 'should have succeeded').to.true;
        expect(tr.warningIssues.length, 'should have no warnings').to.eq(0);
        expect(tr.errorIssues.length, 'should have no errors').to.eq(0);   
    });
});


