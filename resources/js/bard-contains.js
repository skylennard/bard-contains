/**
    Custom field condition for Bard fields
 */
Statamic.$conditions.add('bard-contains', ({target, params}) => {
    target = JSON.parse(target)
    
    const empty = target => {

        if (target.length) {
            var [{content = [],type = ''}] = target
            
            if (target.length > 1 || content.length || type == 'set') {
                return false
            }
        }

        return true
    }

    const contains = (find, target) => {
        for (let contents of target) {
            var {type = '', content = []} = contents

            if
            (
                find === type
                && (
                        (type === 'paragraph' && content.length)
                    ||
                        (type === 'set')
                )
            ) {
                return true
            }
        }
        
        return false
    }

    const status = {
        'hasParagraphs': contains('paragraph',target),
        'hasNoParagraphs': !contains('paragraph',target),
        'hasSets': contains('set',target),
        'hasNoSets': !contains('set',target),
        'notEmpty': !empty(target),
        'empty': empty(target),
    }

    const debug = function() {
        return console.log('bard-contains',{
            'target': target,
            'params': params,
            'status': status,
        })
    }

    for (let param of params) {
        if(param === 'debug') {
            debug()
            continue
        }

        if (!status.hasOwnProperty(param) || status[param] === false) {
            return false
        }
    }

    return true

});