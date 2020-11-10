const CleanRedirectUrl = require('../src/clean-redirect-url');
const { instantiation } = require('./mocks/clean-redirect-url.mock');
const {
  protocol,
  hostname,
  path,
  queryString,
  hash,
  uri,
  url,
} = require('./mocks/black-lives-matter.mock');
const {
  blankString,
  slash,
  querySymbol,
  hashSymbol,
} = require('./mocks/constants.mock');

const testValidInstantiationAndParsing = (mock, result, urlCase) => {
  describe(`CleanRedirectUrl – Instantiation works correctly ${urlCase}`, () => {
    const cleanRedirectUrl = new CleanRedirectUrl(mock);

    test('Passing in valid parameters creates a valid instance of the object', () => {
      expect(cleanRedirectUrl).toBeInstanceOf(CleanRedirectUrl);
    });

    test('Protocol is correctly set', () => {
      expect(cleanRedirectUrl.protocol).toBeDefined();
      expect(cleanRedirectUrl.protocol).toEqual(result.protocol);
    });

    test('Hostname is correctly set', () => {
      expect(cleanRedirectUrl.hostname).toBeDefined();
      expect(cleanRedirectUrl.hostname).toEqual(result.hostname);
    });

    test('Path is correctly set', () => {
      expect(cleanRedirectUrl.path).toBeDefined();
      expect(cleanRedirectUrl.path).toEqual(result.path);
    });

    test('Query string is correctly set', () => {
      expect(cleanRedirectUrl.queryString).toBeDefined();
      expect(cleanRedirectUrl.queryString).toEqual(result.queryString);
    });

    test('Hash is correctly set', () => {
      expect(cleanRedirectUrl.hash).toBeDefined();
      expect(cleanRedirectUrl.hash).toEqual(result.hash);
    });

    test('URI is correctly set', () => {
      expect(cleanRedirectUrl.uri).toBeDefined();
      expect(cleanRedirectUrl.uri).toEqual(result.uri);
    });

    test('URL is correctly set', () => {
      expect(cleanRedirectUrl.url).toBeDefined();
      expect(cleanRedirectUrl.url).toEqual(result.url);
    });

    if (result.path !== blankString) {
      test('Path starts with a slash', () => {
        expect(cleanRedirectUrl.path.startsWith(slash)).toEqual(true);
      });
    }

    if (result.queryString !== blankString) {
      test('Query string starts with a question mark', () => {
        expect(cleanRedirectUrl.queryString.startsWith(querySymbol)).toEqual(true);
      });
    }

    if (result.hash !== blankString) {
      test('Hash starts with a hash sign', () => {
        expect(cleanRedirectUrl.hash.startsWith(hashSymbol)).toEqual(true);
      });
    }
  });
};

Object.keys(instantiation).forEach((key) => {
  testValidInstantiationAndParsing(instantiation[key].mock, instantiation[key].result, key);
});

describe('CleanRedirectUrl – Setter methods work properly', () => {
  const cleanRedirectUrl = new CleanRedirectUrl(instantiation.withQueryWithHash.mock);

  test('Setting protocol works correctly', () => {
    cleanRedirectUrl.setProtocol(protocol);
    expect(cleanRedirectUrl.protocol).toEqual(protocol);
  });

  test('Setting hostname works correctly', () => {
    cleanRedirectUrl.setHostname(hostname);
    expect(cleanRedirectUrl.hostname).toEqual(hostname);
  });

  test('Setting path works correctly', () => {
    cleanRedirectUrl.setPath(path);
    expect(cleanRedirectUrl.path).toEqual(path);
  });

  test('Setting queryString works correctly', () => {
    cleanRedirectUrl.setQueryString(queryString);
    expect(cleanRedirectUrl.queryString).toEqual(queryString);
  });

  test('Setting hash works correctly', () => {
    cleanRedirectUrl.setHash(hash);
    expect(cleanRedirectUrl.hash).toEqual(hash);
  });

  test('URI updates and concats on setter methods', () => {
    expect(cleanRedirectUrl.uri).toEqual(uri);
  });

  test('URL updates and concats on setter methods', () => {
    expect(cleanRedirectUrl.url).toEqual(url);
  });

  test('URL updates and concats on setter methods', () => {
    expect(cleanRedirectUrl.url).toEqual(url);
  });

  test('Passing in a blank string to path sets root', () => {
    cleanRedirectUrl.setPath(blankString);
    expect(cleanRedirectUrl.path).toEqual(slash);
  });
});

describe('CleanRedirectUrl – The generateUrl method works with in all cases', () => {
  const cleanRedirectUrl = new CleanRedirectUrl({
    protocol,
    hostname,
    uri: `${path}${queryString}${hash}`,
  });

  test('With no parameters', () => {
    const result = cleanRedirectUrl.generateUrl();
    expect(result).toEqual(`${protocol}://${hostname}${path}${queryString}${hash}`);
  });

  test('All parameters false', () => {
    const result = cleanRedirectUrl.generateUrl({
      includeProtocol: false,
      includeHostname: false,
      includeQueryString: false,
      includeHash: false,
    });
    expect(result).toEqual(path);
  });

  test('With includeProtocol set to true', () => {
    const result = cleanRedirectUrl.generateUrl({
      includeProtocol: true,
      includeHostname: false,
      includeQueryString: false,
      includeHash: false,
    });
    expect(result).toEqual(`${protocol}://${hostname}${path}`);
  });

  test('With includeProtocol and includeHostname set to true', () => {
    const result = cleanRedirectUrl.generateUrl({
      includeProtocol: true,
      includeHostname: true,
      includeQueryString: false,
      includeHash: false,
    });
    expect(result).toEqual(`${protocol}://${hostname}${path}`);
  });

  test('With includeProtocol set to false and includeHostname set to true', () => {
    const result = cleanRedirectUrl.generateUrl({
      includeProtocol: false,
      includeHostname: true,
      includeQueryString: false,
      includeHash: false,
    });
    expect(result).toEqual(`${hostname}${path}`);
  });

  test('With includeQueryString set to true', () => {
    const result = cleanRedirectUrl.generateUrl({
      includeProtocol: false,
      includeHostname: false,
      includeQueryString: true,
      includeHash: false,
    });
    expect(result).toEqual(`${path}${queryString}`);
  });

  test('With includeHash set to true', () => {
    const result = cleanRedirectUrl.generateUrl({
      includeProtocol: false,
      includeHostname: false,
      includeQueryString: false,
      includeHash: true,
    });
    expect(result).toEqual(`${path}${hash}`);
  });

  test('With includeHash and includeQueryString set to true', () => {
    const result = cleanRedirectUrl.generateUrl({
      includeProtocol: false,
      includeHostname: false,
      includeQueryString: true,
      includeHash: true,
    });
    expect(result).toEqual(`${path}${queryString}${hash}`);
  });
});
