import { useEffect } from "react";

export function useAddEventListener(ref, event, callback, dependencies = [], options = { product: true }) {
	let events = Array.isArray(event) ? event : [event];
	let refs = Array.isArray(ref) ? ref : [ref];
	let handlers = Array.isArray(callback) ? callback : [callback];
	const { product } = options;
	
	if (!product) {
		let allSameLength = refs.length === events.length && refs.length === handlers.length;

		let oneIntoOthers =
		(refs.length === 1 && events.length === handlers.length)
		|| (events.length === 1 && refs.length === handlers.length)
		|| (handlers.length === 1 && refs.length === events.length);
		
		if (!allSameLength && !oneIntoOthers) {
			throw new Error("When product is set to false, the number of refs, events, and handlers must be equal or only one of them must be 1 and the rest is equal.");
		}

		if (oneIntoOthers) {
			if (refs.length === 1) {
				refs = Array(events.length).fill(refs[0]);
			} else if (events.length === 1) {
				events = Array(refs.length).fill(events[0]);
			} else {
				handlers = Array(refs.length).fill(handlers[0]);
			}
		}
	}
	
	useEffect(() => {
		const controller = new AbortController();

		if (!product) {
			for (let i = 0; i < refs.length; i++) {
				refs[i]?.current?.addEventListener(events[i], handlers[i], controller);
			}
			return () => controller.abort();			
		}
		
		for (let rf of refs) {
			for (let e of events) {
				for (let handler of handlers) {
					rf?.current?.addEventListener(e, handler, controller);
				}
			}
		}
		
		return () => controller.abort();
		
	}, dependencies);
}