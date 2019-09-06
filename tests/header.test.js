const puppeteer = require('puppeteer'); 
const sessionFactory = require('./factories/sessionFactory');
const userFactory = require('./factories/userFactory');
// test('Adds two number', ()=>{

//     const sum = 1 + 2;
//     expect(sum).toEqual(3);
// });

let browser, page;

beforeEach( async ()=>{
     browser = await puppeteer.launch({
        headless:false,
    });// every single task we do wiht puppeteer is async, so we use asyc and await
     page  = await browser.newPage();
    await  page.goto('localhost:3000');

});

test('clicking login starts oauth flow',async ()=>{
    await page.click('.right a');

    const url = await page.url();

    expect(url).toMatch(/accounts\.google\.com/);
    // console.log(url, "url");
})

afterEach( async ()=>{
    // await browser.close();
})

// test('We can launch a browser', async ()=>{   
//     const browser = await puppeteer.launch({
//         headless:false,
//     });// every single task we do wiht puppeteer is async, so we use asyc and await
//     const page  = await browser.newPage();
//     await  page.goto('localhost:3000');

//     const text = await page.$eval('a.brand-logo', el => el.innerHTML);

//     expect(text).toEqual('Blogster');
// })


test('clicking login starts oauth flow',async ()=>{
    await page.click('.right a');

    const url = await page.url();

    expect(url).toMatch(/accounts\.google\.com/);
    // console.log(url, "url");
})

test.only('When signed in, shows logout button', async()=>{
    // const id = '5d568a00da838dbb76a9fef3';

    const user = await userFactory();
  const {session, sig} = sessionFactory(user);



    await page.setCookie({name:'session', value:session});

    await page.setCookie({name: 'session.sig',  value:sig});

    await page.goto('localhost:3000');

    await page.waitFor('a[href ="/auth/logout"]');

    const text = await page.$eval('a[href="/auth/logout"]', el => el.innerHTML);

    expect(text).toEqual('Logout');

});