---
title: Mock toLocaleString in Jest
subTitle: PhantomJS doesn't support multiple locale. Here is a way to mock them in tests.
postDescription: Found an issue while testing toLocaleString and other related JS prototype function. Described here is the way to mock them.
category: Jest
---
We had to use `toLocaleString` with a specific country-code. `toLocaleString('de')`. This works perfectly in all the browsers. However, not in jest tests.

Our Jest tests were running with `--env=jsdom` I got to know that jsdom and phantomJS aren't supporting multiple locale implementations.

[PhantomJS support locale-specific.](https://github.com/ariya/phantomjs/issues/12327)

So, the only solution I found is to mock these methods and test rest of the logic. Here is a sample mock behaviour.

```js
import * as helpers from '../src/helpers';
describe('formatDate', () => {
it('should invoke localString implementation to format date ', () => {
    const localStringMock = jest.fn();
    const mockDate = { toLocaleString: localStringMock };
    helpers.formatDate(mockDate);
    expect(localStringMock).toHaveBeenCalledWith('de-DE', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
        });
    });
});
```

**Note:** This behaviour is applicable for toLocaleDateString() toLocaleTimeString()