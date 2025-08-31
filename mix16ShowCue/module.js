// Open Stage Control Custom Module

const cueAddresses = ['/mix16showcue/nextcue/name', '/mix16showcue/playingcue/name'];

module.exports = {
    init: () => {
        const remote = settings.read('send')[0];
        const host = remote.split(':')[0];
        const port = remote.split(':')[1];

        function refreshCues() {
            for (const a of cueAddresses) {
                send(host, port, a);
            }
        }
        function refreshPatch() {
            send(host, port, '/settings/light/patch');
        }
        function thump() {
            send(host, port, '/thump');
        }

        setInterval(refreshCues, 0.5 * 1000);
        setInterval(refreshPatch, 5 * 1000);
        setInterval(thump, 30 * 1000);
    },
    oscInFilter: (data) => {
        if (data.address.startsWith('/reply')) {
            const regex = /^\/reply\/cue_id\/[A-Z0-9\-]+\/([a-zA-Z\/]+)$/;
            if (regex.test(data.address)) {
                data.address = data.address.replace(regex, '/cue/selected/$1');
            } else {
                data.address = data.address.replace(/^\/reply/, '');
            }

            const reply = JSON.parse(data.args[0].value);
            if (reply.workspace_id) {
                receive(
                    '192.168.50.49',
                    7201,
                    '/workspace_id',
                    reply.workspace_id
                );
            }

            data.args = [
                {
                    type: 's',
                    value: reply.data,
                },
            ];
        }

        return data;
    },
    oscOutFilter: (data) => {
        if (data.args.some((a) => a.value === 'rgb')) {
            const index = data.args.findIndex((a) => a.value === 'rgb');
            const [r, g, b] = data.args
                .slice(index + 1, index + 4)
                .map((a) => a.value);
            data.args = data.args.slice(0, index);
            data.args.push({
                type: 's',
                value: `rgb(${r},${g},${b})`,
            });
        } else if (data.args.some((a) => a.value === 'pantilt')) {
            const index = data.args.findIndex((a) => a.value === 'pantilt');
            const [pan, tilt] = data.args
                .slice(index + 1, index + 3)
                .map((a) => a.value);
            data.args = data.args.slice(0, index);
            data.args.push({
                type: 's',
                value: `pantilt(${pan},${tilt})`,
            });
        }

        return data;
    },
};
