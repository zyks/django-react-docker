import ArticleAdapter from './ArticleAdapter';


const testResponseData = [
    { 
        author: 'Steve Jobs',
        title: 'Random quotes',
        content: 'I believe life is an intelligent thing: that things aren\'t random.',
        created_at: "2018-12-29T19:02:06.923030Z",
        comments: [
            { author: 'Josef', content: 'I like that!', created_at: "2018-12-29T19:02:06.923030Z" },
            { author: 'Estelle', content: 'Cool stuff.', created_at: "2018-12-31T15:02:06.923030Z" },
        ]
    },
    { 
        author: 'Richard Dawkins',
        title: 'Random quotes part 2',
        content: 'Natural selection is anything but random.',
        created_at: "2018-12-29T19:15:06.923030Z",
        comments: [
            { author: 'Lorenzo', content: 'Not this time bro', created_at: "2018-12-30T11:07:06.923030Z" },
        ]
    },
]

const expected = [
    { 
        author: 'Steve Jobs',
        title: 'Random quotes',
        content: 'I believe life is an intelligent thing: that things aren\'t random.',
        created_at: new Date("2018-12-29T19:02:06.923030Z"),
        comments: [
            { author: 'Josef', content: 'I like that!', created_at: new Date("2018-12-29T19:02:06.923030Z") },
            { author: 'Estelle', content: 'Cool stuff.', created_at: new Date("2018-12-31T15:02:06.923030Z") },
        ]
    },
    { 
        author: 'Richard Dawkins',
        title: 'Random quotes part 2',
        content: 'Natural selection is anything but random.',
        created_at: new Date("2018-12-29T19:15:06.923030Z"),
        comments: [
            { author: 'Lorenzo', content: 'Not this time bro', created_at: new Date("2018-12-30T11:07:06.923030Z") },
        ]
    },
]

it('correctly converts datetime from ISO format', () => {
    // result is a reference to modified testResponseData
    const result = ArticleAdapter.parseResponseData(testResponseData);
    expect(result).toEqual(expected);
});
