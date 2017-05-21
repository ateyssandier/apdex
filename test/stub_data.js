export const app1 = {
    name: 'app1',
    apdex: 10,
    host: [ 'host1' ],
    contributors: ['person'],
    version: 1,
}

export const app2 = {
    name: 'app2',
    apdex: 6,
    host: [ 'host1', 'host2' ],
    contributors: ['person'],
    version: 1,
}

export const app3 = {
    name: 'app3',
    apdex: 4,
    host: [ 'host2' ],
    contributors: ['person'],
    version: 1,
}

export const app4 = {
    name: 'app4',
    apdex: 8,
    host: [ 'host1', 'host2' ],
    contributors: ['person'],
    version: 1,
}

export default [
    app1,
    app2,
    app3,
    app4,
]