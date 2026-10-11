import { StatusCodes } from 'http-status-codes'
import { expect, test } from '@playwright/test'

test.describe('correct POST /api/products', () => {
  test('post request with correct body', async ({ request }) => {
    const correctBody = {
      name: 'Water',
      category: 'Drinks',
      price: 0.29,
      quantity: 100,
    }

    const response = await request.post('https://shop.tl-academy.ee/api/products', {
      data: correctBody,
    })
    const responseBody = await response.json()
    const statusCode = response.status()

    console.log('response status: ', statusCode, 'response body: ', responseBody)

    expect(statusCode).toBe(StatusCodes.CREATED)
    expect(typeof responseBody.name).toBe('string')
    expect(typeof responseBody.price).toBe('number')
    expect(typeof responseBody.quantity).toBe('number')
  })
  test('post request with >0 quantity and false available', async ({ request }) => {
    const bodyWithFAvailable = {
      name: 'Meat',
      category: 'Food',
      price: 2.99,
      quantity: 24,
      available: false,
    }

    const response = await request.post('http://shop.tl-academy.ee/api/products', {
      data: bodyWithFAvailable,
    })
    const responseBody = await response.json()
    const statusCode = response.status()

    console.log('response status: ', statusCode, 'response body: ', responseBody)

    expect(statusCode).toBe(StatusCodes.CREATED)
  });

  test('post request without quantity', async ({ request }) => {
    const bodyWithoutQuantity = {
      name: 'Meat',
      category: 'Food',
      price: 2.99
    };

    const response = await request.post('http://shop.tl-academy.ee/api/products', {
      data: bodyWithoutQuantity,
    });

    const responseBody = await response.json();
    const statusCode = response.status();

    console.log('response status: ', statusCode, 'response body: ', responseBody);

    expect(statusCode).toBe(StatusCodes.CREATED);
    expect(responseBody.quantity).toBe(0);
  })
})

test.describe('uncorrect POST /api/products', () => {
  test('post request without name', async ({ request }) => {
    const bodyWithoutName = {
      category: 'Games',
      price: 9.99,
      quantity: 5,
    }
    const response = await request.post('https://shop.tl-academy.ee/api/products', {
      data: bodyWithoutName,
    })
    const responseBody = await response.json()
    const statusCode = response.status()

    console.log('response status: ', statusCode, 'response body: ', responseBody)

    expect(statusCode).toBe(StatusCodes.BAD_REQUEST)
  })

  test('post request without category', async ({ request }) => {
    const bodyWithoutCategory = {
      name: 'Banana',
      price: 0.25,
      quantity: 100
    }

    const response = await request.post('http://shop.tl-academy.ee/api/products', {
      data: bodyWithoutCategory
    });
    const responseBody = await response.json();
    const statusCode = response.status();

    console.log('response status: ', statusCode, 'response body: ', responseBody);

    expect(statusCode).toBe(StatusCodes.BAD_REQUEST);
  });

  test('post request without price', async ({ request }) => {
    const bodyWithoutPrice = {
      name: 'Laptop',
      category: 'Technique',
      quantity: 2
    }

    const response = await request.post('http://shop.tl-academy.ee/api/products', {
      data: bodyWithoutPrice
    });
    const responseBody = await response.json();
    const statusCode = response.status();

    console.log('response status: ', statusCode, 'response body: ', responseBody);

    expect(statusCode).toBe(StatusCodes.BAD_REQUEST);
  });

  test('post request with 0 quantity and available true', async ({ request }) => {
    const bodyWithFAvailable = {
      name: 'Meat',
      category: 'Food',
      price: 2.99,
      quantity: 0,
      available: true,
    }

    const response = await request.post('http://shop.tl-academy.ee/api/products', {
      data: bodyWithFAvailable,
    })
    const responseBody = await response.json()
    const statusCode = response.status()

    console.log('response status: ', statusCode, 'response body: ', responseBody)

    expect(statusCode).toBe(StatusCodes.BAD_REQUEST) // Баг?????
  });

  test('post request with negative in quantity', async ({ request }) => {
    const bodyWithNegativeQuantity = {
      name: 'Milk',
      category: 'Drinks',
      price: 0.99,
      quantity: -1
    };
    const response = await request.post('http://shop.tl-academy.ee/api/products', {
      data: bodyWithNegativeQuantity
    });

    const responseBody = await response.json();
    const statusCode = response.status();

    console.log('response status: ', statusCode, 'response body: ', responseBody);

    expect(statusCode).toBe(StatusCodes.BAD_REQUEST);
  });

  test('post request with negative price', async ({ request }) => {
    const bodyWithNegativePrice = {
      name: 'Cookies',
      category: 'Food',
      price: -1.99,
      quantity: 4
    };

    const response = await request.post('http://shop.tl-academy.ee/api/products', {
      data: bodyWithNegativePrice
    });

    const responseBody = await response.json();
    const statusCode = response.status();

    console.log('response status: ', statusCode, 'response body: ', responseBody);

    expect(statusCode).toBe(StatusCodes.BAD_REQUEST); // Баг
  });

  test('post request with string in quantity', async ({ request }) => {
    const bodyWithQString = {
      name: 'Water',
      category: 'Drinks',
      price: 0.99,
      quantity: '100'
    }

    const response = await request.post('http://shop.tl-academy.ee/api/products', {
      data: bodyWithQString
    });

    const responseBody = await response.json();
    const statusCode = response.status();

    console.log('response status: ', statusCode, 'response body: ', responseBody);

    expect(statusCode).toBe(StatusCodes.BAD_REQUEST);
  });

  test('post request with string in price', async ({ request }) => {
    const bodyWithQString = {
      name: 'Water',
      category: 'Drinks',
      price: '1',
      quantity: 100,
    }

    const response = await request.post('http://shop.tl-academy.ee/api/products', {
      data: bodyWithQString,
    })

    const responseBody = await response.json()
    const statusCode = response.status()

    console.log('response status: ', statusCode, 'response body: ', responseBody)

    expect(statusCode).toBe(StatusCodes.BAD_REQUEST)
  })
})
