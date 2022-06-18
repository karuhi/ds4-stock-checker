const jw = {
    baseUrl: 'https://joshinweb.jp/game/26171/',
    cts: {
        black: '4948872414203.html',
        white: '4948872414340.html',
        red: '4948872414296.html',
        blue: '4948872414562.html',
        gold: '4948872414357.html',
        cooper: '4948872414753.html',
    },
    getUrl: (ct) => {
        return { url: `${jw.baseUrl}${jw.cts[ct]}`, color: ct }
    },
}
export const urls = [
    jw.getUrl('black'),
    jw.getUrl('white'),
    jw.getUrl('red'),
    jw.getUrl('blue'),
    jw.getUrl('gold'),
    jw.getUrl('cooper'),
]
