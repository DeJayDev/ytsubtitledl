const youtubedl = require('youtube-dl-exec')

const YOUTUBE_REGEX = /(?:youtube\.com\/\S*(?:(?:\/e(?:mbed))?\/|watch\/?\?(?:\S*?&?v\=))|youtu\.be\/)([a-zA-Z0-9_-]{6,11})/g

async function getCaptions(url, auto, api) {
    if(!YOUTUBE_REGEX.test(url)) {
        throw new Error('Invalid YouTube URL provided.')
    }
    if(auto == undefined) {
        auto = false
    }
    if(api == undefined) {
        api = false
    }

    const res = await youtubedl(url, {
        //quiet: true,
        'skip-download': true,
        'list-subs': auto ? null : true,
        'write-auto-sub': auto ? true : null
    })

    if(res.includes('has no subtitles')) {
        return Promise.reject('The video provided does not have any manually written subtitles. Consider passing auto to download automatic subtitles.')
    }

    return true

}


getCaptions('https://www.youtube.com/watch?v=DYVH5e5x5r0', true).then(res => console.log(res)).catch(err => console.log(err))

module.exports.getCaptions = getCaptions