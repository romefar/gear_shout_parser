
import { AsyncStorage, Image } from 'react-native';

const cheerio = require('react-native-cheerio')

class GearshoutService { 

    // base page num
    page = 0;

    // section header 
    header = '';

    // section description
    description = '';
    
    // raw news html
    markup = '';

    // cheerio instance 
    $ = '';

    // posts id's
    ids = [];

    // num posts t cache
    postsToCache = 4;

    // cached data 
    cachedNews = [];

    // news preview
    news = [];

    //current news
    currentNews = null;

    // cheerio options object
    options = { 
        decodeEntities: false
    }

    //base url 
    url = `https://www.gearshout.net/novosti/#content`;

    _getResource = async (url) => {
        try {
            const data = await fetch(url);
            console.log(`Data fetched`);
            if(!data.ok) { 
                throw new Error(`Could not fetch data from the server. Response status : ${data.status}`);
            }
            const markup = await data.text();
            return markup;
        } catch (error) {
            throw new Error(`Error. Unable to fetch data from ${this.url}`);
        }
    }

    _parseNewsItem = async ($, id, cache = true, qrLink) => {
        const images = [];
        const title = this.$('.entry-title').text();
        const author = this.$('.author').children().first().text();
        const date = this.$('.entry-date').text();
        this.$('img', '.entry-content').map(function (index, item) {
            if ($(this).attr('data-ezsrc') !== undefined) {
                images.push($(this).attr('data-ezsrc'));
                Image.prefetch($(this).attr('data-ezsrc'));
            }
        });
        let text = $('.entry-content').text();
        text = text.slice(0, text.indexOf('Нравится') - 2);
        if (text.includes('<iframe')) {
            text = text.replace(/<iframe.+?<\/iframe>/g, '');
        }
        // console.log(text);
        text = text.replace(/\n\n/g, '{----IMAGE----}').split('{----IMAGE----}');
        if (cache) {
            this.cachedNews.push({
                id,
                images,
                title,
                author,
                date,
                text,
                qrLink
            });
        } else {
            this.currentNews = {
                id,
                images,
                title,
                author,
                date,
                text,
                qrLink
            }
        }
    }

    fetchData = async () => { 
        try {
            this.markup = await this._getResource(this.url);
          //  console.log('Markup ready');
            this.$ = cheerio.load(this.markup, this.options);
          //  console.log(`HTML loaded`);
            this._getPosts(this.ids, this.$);
          //  console.log(`Posts loaded ${this.ids.length}`);
            await this._parseNewsPreview();
            await this._cacheGearData();
            return this.news;
        } catch (error) {
            throw new Error(`Error. Could not initalize service component`);
        }
    }

    _getCurrentNews = async (newsItem) => { 
        try {
            const cacheMarkup = await this._getResource(newsItem.newsLink + '#content');
            this.$ = cheerio.load(cacheMarkup, this.options);
            await this._parseNewsItem(this.$, newsItem.id, false, newsItem.newsLink + '#content');
        } catch (error) {
            throw new Error(`Error. Could not get post data.`);
        }
    }

    _cacheGearData = async () => {
        try {
            const data = this.news;
            let cacheMarkup;
            for (let i = 0; i < this.postsToCache; i++) {
                cacheMarkup = await this._getResource(data[i].newsLink + '#content');
                this.$ = cheerio.load(cacheMarkup, this.options);
                await this._parseNewsItem(this.$, data[i].id, true, data[i].newsLink + '#content');
            }
        } catch (error) {
            throw new Error(`Error. Could not get post data.`);
        }
    }
 
    _parseNewsPreview = async () => {
        this.header = this.$('.archive-title').text();
        this.description = this.$('.archive-meta').children().first().text();
        this.ids.forEach(item => {
            const title = this.$('.entry-title', `article[id=${item}]`).children().first().text();
            const newsLink = this.$('.entry-title', `article[id=${item}]`).children().first().attr('href');
            const img = this.$('.entry-thumbnail', `article[id=${item}]`).children().first().children().first().attr('data-ezsrc');
            const description = this.$('.entry-summary', `article[id=${item}]`).text();
            const date = this.$('.entry-date', `article[id=${item}]`).text();
            const comments = this.$('.leave-reply', `article[id=${item}]`).children().first().attr('href');
            this.news.push({
                id: item,
                title,
                newsLink,
                img,
                description,
                date, 
                comments
            });       
        });
    }

    _getPosts = (_ids, $) => {
        this.$('article[class*=post]', '.site-content').map(function (index, item) {
            _ids.push($(this).attr('id'));
        });
    }

    
    getNewsBy = async (news_id) => { 
        const id = this.cachedNews.findIndex(item => item.id === news_id);
        if(id !== -1){
            return this.cachedNews[id];
        } else { 
            const id = this.news.findIndex(item => item.id === news_id);
           // console.log(`SEARCH ID ${id}`);
           //console.log(this.news[id]);
            await this._getCurrentNews(this.news[id]);
            return this.currentNews;
        }
    }


}

export default GearshoutService;