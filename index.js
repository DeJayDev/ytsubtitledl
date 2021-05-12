const youtubedl = require('youtube-dl-exec')

const YOUTUBE_REGEX = /(?:https?:\/\/)?(?:www\.)?youtu(?:\.be\/|be.com\/\S*(?:watch|embed)(?:(?:(?=\/[^&\s\?]+(?!\S))\/)|(?:\S*v=|v\/)))([^&\s\?]+)/g

async function getCaptions(url, auto) {
    if(!url.match(YOUTUBE_REGEX)) {
        throw new Error('Invalid YouTube URL provided.')
    }
    if(auto == undefined) {
        auto = false
    }

    var res = await youtubedl(url, {
        'skip-download': true,
        'list-subs': auto ? null : true,
        'write-auto-sub': auto ? true : null,
        'write-sub': auto ? null : true
    })

    if(res === undefined) {
        res = ''
    }

    if(res.includes('has no subtitles')) {
        return Promise.reject('The video provided does not have any manually written subtitles. Consider passing auto to download automatic subtitles.')
    } else {
        if(auto == false) {
            await youtubedl(url, {
                'skip-download': true,
                'list-subs': null,
                'write-sub': true
            })
        }
    }

    return true

}

module.exports.getCaptions = getCaptions