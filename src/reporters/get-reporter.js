import { TestlinkReporter } from './TestlinkReporter';

const getReporter = ({ options, stepResults }) => {
  if (options.junitReport) {
    return new TestlinkReporter({ stepResults });
  } else {
    return null;
  }
};

export {
  getReporter
};
