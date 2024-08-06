import { ReporterInterface } from './ReporterInterface';
import { truncateAfterDecimal } from '../common/number-util';

const { spawn } = require('child_process');

class TestlinkReporter extends ReporterInterface {
  constructor ({ stepResults }) {
    super({
      stepResults,
      type: 'Testlink',
      outputFile: '/home/testlink_results.txt'
    });
  }
  generateReport () {
    let previousStepFilePath = '';
    let xml = '';
    this.stepResults.forEach(stepResult => {
      if (stepResult.getStepFilePath() !== previousStepFilePath) {
        if (previousStepFilePath !== '') {
          xml += ``;
        }
        xml += ``;
        previousStepFilePath = stepResult.getStepFilePath();
      }
      if (stepResult.getPassed()) {
        xml += 'PASS~';
        xml += stepResult.getStepName();
        xml += '-';
        xml += 'time=';
        xml += truncateAfterDecimal(stepResult.getDuration() / 1000, 5);
      } else {
        xml += 'FAIL~';
        xml += stepResult.getStepName();
        xml += '-';
        xml += stepResult.getErrorMessage();
        xml += '-';
        xml += 'time=';
        xml += truncateAfterDecimal(stepResult.getDuration() / 1000, 5);
      }

      xml += '\n';
      const pythonProcess = spawn('python', ['/home/reporter_testlink.py']);
      pythonProcess.on('close', (code) => {
        console.log(code);
      });
    });
    return xml;
  }
}

export {
  TestlinkReporter
};
