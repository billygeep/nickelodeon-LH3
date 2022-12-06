
import { getTracking } from '../helpers/DataFactory';

export default function trackEvent(_event) {

	let event = _event
  	if (window.CONFIG.tracking.active && event.active) {
    	// btg.Controller.sendPageCall({ channel: window.CONFIG.tracking.channel, pageName: event.action });
  	} else {
    	// console.log(CONFIG.channel, event);
  	}
}
