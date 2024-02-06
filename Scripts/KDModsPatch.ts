;(() => {
	const oldKDGetModsLoad = KDGetModsLoad;
	// @ts-ignore
	KDGetModsLoad = async (execute) => {
		try {
			// @ts-ignore
			const idbKeyval = window.idbKeyval;
			console.log('idbKeyval', idbKeyval);
			const customStore = idbKeyval.createStore('KDPatchModLoad', 'KDModsLoad');
			let mods = await idbKeyval.entries(customStore);
			console.log('KDGetModsLoad idbKeyval mods', mods);
			for (let m of mods) {
				KDMods[m[0]] = await (await fetch(m[1])).blob();
			}
		} catch (err) {
			console.log('KDGetModsLoad idbKeyval', err);
		}
		return oldKDGetModsLoad(execute);
	}

	const oldKDExecuteMods = KDExecuteMods;
	// @ts-ignore
	KDExecuteMods = async () => {
		if (!KDExecuted) {
			// @ts-ignore
			const idbKeyval = window.idbKeyval;
			console.log('idbKeyval', idbKeyval);
			const customStore = idbKeyval.createStore('KDPatchModLoad', 'KDModsLoad');
			console.log('KDMods', KDMods);
			let mods: [string, string][] = [];
			for (let [path, file] of Object.entries(KDMods)) {
				const data = await new Promise((resolve, reject) => {
					const reader = new FileReader();
					reader.readAsDataURL(file as File);
					reader.onload = function (e) {
						resolve(e.target?.result);
					};
					reader.onerror = function (e) {
						reject(e);
					}
				});
				mods.push([path, data as string]);
				await idbKeyval.set(path, data, customStore);
			}
			console.log('mods', mods);
		}
		return oldKDExecuteMods();
	}
})();
