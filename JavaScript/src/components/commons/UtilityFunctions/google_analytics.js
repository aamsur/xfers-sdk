import ReactGA from 'react-ga'

ReactGA.initialize('UA-40679649-1', {testMode: true});

export default function trackGAEvents(trackingParams) {
  ReactGA.ga('send', trackingParams);
}
