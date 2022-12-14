/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', () => {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', () => {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('has URL', () => {
            for (const feed of allFeeds) {
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBe(0);
            };
        });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('has name', () => {
            for (const feed of allFeeds) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            };
        });
    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', () => {
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        let bodyEl;
        let classList;
        beforeEach(() => {
            bodyEl = document.querySelector('body');
            classList = [bodyEl.ClassList].length;
        });
        it('menu hidden by default', () => {
            let nameOfClass = 'menu-hidden';
            expect(classList).toBe(1);
            expect(bodyEl.className).toBe(nameOfClass);
        });

        /* TODO: Write a test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('open and close menu by click', () => {
            let clickCounter = 0;
            if (bodyEl.click()) {
                clickCounter++;
            }
            if (bodyEl.click() && clickCounter % 2 !== 0 || clickCounter === 0) {
                expect(classList).toBe(1);
            };
            if (bodyEl.click() && clickCounter % 2 === 0) {
                expect(classList).toBe(0);
            }
        });

    });
    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', () => {
        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(done => {
            loadFeed(0, () => done());
        });
        it('at least a single element in feed container after loadFeed() is done', done => {
            let feedChldrnListLnth = document.querySelector('.feed').childNodes.length;
            expect(feedChldrnListLnth).not.toBe(0);
            done();
        });
    });
    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', () => {
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        let firstContent;
        let secondContent;
        beforeEach(done => {
            loadFeed(0, () => {
                firstContent = document.querySelector('.feed').innerHTML
                loadFeed(1, () => {
                    secondContent = document.querySelector('.feed').innerHTML
                    done();
                });
            });
        });
        it('content of each feed changes', done => {
            expect(firstContent).not.toBe(secondContent);
            done();
        });
    });
}());
