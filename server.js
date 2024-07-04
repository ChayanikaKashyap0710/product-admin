const express = require('express');
const app = express();
var request = require('request');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
const graphqlEndpoint = 'https://store-6rdwu4oyoo.mybigcommerce.com/graphql';
var api_headers = {
  'Content-Type': 'application/json',
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiJ9.eyJjaWQiOjEsImNvcnMiOltdLCJlYXQiOjE4ODU2MzUxNzYsImlhdCI6MTcwNTk5NTA0NCwiaXNzIjoiQkMiLCJzaWQiOjEwMDIzNjUzODcsInN1YiI6IjF6Mm5mamNtYWtndXFueHdpZnhzN3Y4N203OGFqaGkiLCJzdWJfdHlwZSI6MiwidG9rZW5fdHlwZSI6MX0.U04nT7ZpqihiwekTz4XV8h08hF0o7gmwW0U4nPCnBEuBlRBq-hAxzUisvaUkwhyeeyB_bSJFB_md0QWneGFYwg'
};

app.use(cors())
const graphqlQuery = `
query CategoryTree3LevelsDeep {
  site {
    categoryTree {
      ...CategoryFields
      children {
        ...CategoryFields
        children {
          ...CategoryFields
        }
      }
    }
  }
}

fragment CategoryFields on CategoryTreeItem {
  name
  path
  entityId
}
`;

function categoryFetch() {
  app.get('/', async (req, res) => {
    try {
      const response = await fetch(graphqlEndpoint, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
          'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiJ9.eyJjaWQiOjEsImNvcnMiOltdLCJlYXQiOjE4ODU2MzUxNzYsImlhdCI6MTcwNTk5NTA0NCwiaXNzIjoiQkMiLCJzaWQiOjEwMDIzNjUzODcsInN1YiI6IjF6Mm5mamNtYWtndXFueHdpZnhzN3Y4N203OGFqaGkiLCJzdWJfdHlwZSI6MiwidG9rZW5fdHlwZSI6MX0.U04nT7ZpqihiwekTz4XV8h08hF0o7gmwW0U4nPCnBEuBlRBq-hAxzUisvaUkwhyeeyB_bSJFB_md0QWneGFYwg'
        },
        body: JSON.stringify({ query: graphqlQuery }),
      });
      if (response.ok) {
        const data = await response.json();
        res.json(data);
      } else {
        res.status(response.status).json({ error: 'Failed to fetch data from GraphQL endpoint' });
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
}
categoryFetch();
app.use(express.json())
let receivedValue = '';
app.post('/category-id', (req, res) => {
  const { value } = req.body;
  //console.log('Received value:', value);
  receivedValue = { value };
  res.json({ message: 'Value received successfully' });
});
app.get('/category-id', async (req, res) => {
  //console.log('Using received value:', JSON.stringify(receivedValue.value));
  var categoryId = JSON.stringify(Number(receivedValue.value));
  if (categoryId !== undefined) {
    const singleCategoryQuery = `query productsInCategory(
      $pageSize: Int = 12
      )
      {
      site {
          category(entityId: ${categoryId}) {
          name
          entityId
          products(first: $pageSize) {
              pageInfo {
              hasNextPage
              startCursor
              endCursor
              }
              edges {
              node {
                  name
                  sku
                  entityId
                  defaultImage {
                      url (width: 500)
                      urlOriginal
                      altText
                      isDefault
                    }
                  inventory {
                      aggregated {
                        availableToSell
                        warningLevel
                      }
                    }
                  prices {
                      price {
                        value
                        currencyCode
                      }
                    }
                    variants(first: 100) {
                      edges {
                        node {
                          entityId
                          sku
                          inventory {
                            aggregated {
                              availableToSell
                              warningLevel
                            }
                          }
                          defaultImage {
                            url (width: 500)
                            urlOriginal
                            altText
                            isDefault
                          }
                          productOptions (first: 10) {
                            edges {
                              node {
                                ... on MultipleChoiceOption { 
                                  values {
                                    edges {
                                      node {
                                        entityId
                                        label
                                        isDefault
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
              }
              }
          }
          }
      }
      }`;
    try {
      const response = await fetch(graphqlEndpoint, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
          'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiJ9.eyJjaWQiOjEsImNvcnMiOltdLCJlYXQiOjE4ODU2MzUxNzYsImlhdCI6MTcwNTk5NTA0NCwiaXNzIjoiQkMiLCJzaWQiOjEwMDIzNjUzODcsInN1YiI6IjF6Mm5mamNtYWtndXFueHdpZnhzN3Y4N203OGFqaGkiLCJzdWJfdHlwZSI6MiwidG9rZW5fdHlwZSI6MX0.U04nT7ZpqihiwekTz4XV8h08hF0o7gmwW0U4nPCnBEuBlRBq-hAxzUisvaUkwhyeeyB_bSJFB_md0QWneGFYwg'
        },
        body: JSON.stringify({ query: singleCategoryQuery }),
      });
      if (response.ok) {
        const data = await response.json();
        res.json(data);
      } else {
        res.status(response.status).json({ error: 'Failed to fetch data from GraphQL endpoint' });
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }

  } else {

  }

});

var loginData = '';
app.post('/login', (req, res) => {
  const { value } = req.body;
  //console.log('Received value:', value);
  loginData = { value };
  res.json({ message: 'Value received successfully' });
});

app.get('/login', async (req, res) => {
  if (loginData !== undefined) {
    var getData = JSON.parse(loginData.value);
    //console.log(getData.email);
    var options = {
      'method': 'POST',
      'url': 'https://store-6rdwu4oyoo.mybigcommerce.com/graphql',
      'headers': {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiJ9.eyJjaWQiOjEsImNvcnMiOlsiaHR0cHM6Ly9zdG9yZS5leGFtcGxlLmNvbSJdLCJlYXQiOjIwMDAwMDAwMDAsImlhdCI6MTcxMjU1MzAyNCwiaXNzIjoiQkMiLCJzaWQiOjEwMDIzNjUzODcsInN1YiI6IjM4bm5ibml4eWZkdTQyaGJ6dTZuYWQ4aWpvN2d4cXgiLCJzdWJfdHlwZSI6MiwidG9rZW5fdHlwZSI6MX0.VPF6a9ZeeLJqouO5d-jQEfCIzAjeoaZM9kbWR8n4I0pyveALVxjnkWQpuWTmUvmr68tymZ-s2Hje9YcZ9CD--A',
        'Cookie': 'SHOP_SESSION_TOKEN=20a0d820-c30f-4253-9078-cac7f41b589d; SHOP_TOKEN=969ff925a6ccfaf9aa161dfcea6e0de4c4fd32db78c8d82e37339916ef24ef23_1715001021; athena_short_visit_id=f72dff08-4d9f-4045-a6a4-b98fa5646624:1714395691; fornax_anonymousId=1f6a55ee-77ce-47bf-8cb0-d6b1aa504469'
      },
      body: JSON.stringify({
        query: `mutation Login($email: String!, $pass: String!) {
        login(email: $email, password: $pass) {
          result
        }
      }`,
        variables: { "email": getData.email, "pass": getData.password }
      })
    };
    request(options, function (error, response) {
      if (error) throw new Error(error);
      res.send(response.body);
    });

  } else {
    res.status(400).json({ error: 'Login data is undefined' });
  }
});

let searchValue = '';
app.post('/search', (req, res) => {
  const { value } = req.body;
  searchValue = { value };
  res.json({ message: 'Search Value received successfully' });
});
app.get('/search', async (req, res) => {
  if (searchValue.value !== undefined) {
    var options = {
      'method': 'POST',
      'url': 'https://store-6rdwu4oyoo.mybigcommerce.com/graphql',
      'headers': {
        'Content-Type': 'application/json',
        'Connection': 'keep-alive',
        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiJ9.eyJjaWQiOjEsImNvcnMiOlsiaHR0cHM6Ly9zdG9yZS5leGFtcGxlLmNvbSJdLCJlYXQiOjIwMDAwMDAwMDAsImlhdCI6MTcxMjU1MzAyNCwiaXNzIjoiQkMiLCJzaWQiOjEwMDIzNjUzODcsInN1YiI6IjM4bm5ibml4eWZkdTQyaGJ6dTZuYWQ4aWpvN2d4cXgiLCJzdWJfdHlwZSI6MiwidG9rZW5fdHlwZSI6MX0.VPF6a9ZeeLJqouO5d-jQEfCIzAjeoaZM9kbWR8n4I0pyveALVxjnkWQpuWTmUvmr68tymZ-s2Hje9YcZ9CD--A'
      },
      body: JSON.stringify({
        query: `query {
        site {
          search {
            searchProducts(
              filters: {
                searchTerm: ${searchValue.value}
              }
              sort: A_TO_Z
            ) {
              products {
                edges {
                  node {
                    entityId
                    name
                    path
                    defaultImage {
                      url (width: 500)
                      urlOriginal
                      altText
                      isDefault
                    }
                    prices {
                      price {
                        value
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }`
      })
    };
    request(options, function (error, response) {
      if (error) throw new Error(error);
      res.send(response.body);
    });
  }
})
app.get('/logout', async (req, res) => {
  let data = JSON.stringify({
    query: `mutation Logout {
  logout {
    result
  }
}`,
    variables: {}
  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://store-6rdwu4oyoo.mybigcommerce.com/graphql',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiJ9.eyJjaWQiOjEsImNvcnMiOlsiaHR0cHM6Ly9zdG9yZS5leGFtcGxlLmNvbSJdLCJlYXQiOjIwMDAwMDAwMDAsImlhdCI6MTcxMjU1MzAyNCwiaXNzIjoiQkMiLCJzaWQiOjEwMDIzNjUzODcsInN1YiI6IjM4bm5ibml4eWZkdTQyaGJ6dTZuYWQ4aWpvN2d4cXgiLCJzdWJfdHlwZSI6MiwidG9rZW5fdHlwZSI6MX0.VPF6a9ZeeLJqouO5d-jQEfCIzAjeoaZM9kbWR8n4I0pyveALVxjnkWQpuWTmUvmr68tymZ-s2Hje9YcZ9CD--A',
      'Cookie': '__cf_bm=x1kaF.Yn76HfLI_YRN0DDPApbl2Ene16KQeFZOR5SLM-1719221828-1.0.1.1-IMle3MoqsLVmxpCaOkcS2uqMZFv0MGaz5BjSLWg81H02oePqo8K9tG26HaT0qeJX2sqX4rbHqjyAB5dNMuYwnQ; SHOP_SESSION_TOKEN=54018ae4-7f6d-4d8b-a9d0-affb2f67e11a; athena_short_visit_id=4121462f-9852-4fbe-8a7d-068a6486c00f:1719221827; fornax_anonymousId=b5a8b7db-d9b0-4f74-848f-0bbbeebfd2a8'
    },
    data: data
  };

  axios.request(config)
    .then((response) => {
      //console.log(JSON.stringify(response.data));
      res.send(response.data);
    })
    .catch((error) => {
      //console.log(error);
    });

});

app.get('/country', async (req, res) => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'https://api.bigcommerce.com/stores/6rdwu4oyoo/v2/countries?limit=250',
    headers: {
      'X-Auth-Token': 'oagdmivfacmffmwnsg6lp490f7bcjk0',
      'Content-Type': 'application/json'
    }
  };

  axios.request(config)
    .then((response) => {
      //console.log(JSON.stringify(response.data));
      res.send(response.data);
    })
    .catch((error) => {
      //console.log(error);
    });


})

let receivedProductId = '';
app.post('/product-id', (req, res) => {
  const { value } = req.body;
  //console.log('Received value:', value);
  receivedProductId = { value };
  res.json({ message: 'Value received successfully' });
});
app.get('/product-id', (req, res) => {
  let data = JSON.stringify({
    query: `query SingleProduct {
    site {
      products (entityIds: ${receivedProductId.value}) {
        edges {
          node {
            id
            entityId
            name
            plainTextDescription
            brand {
              name
                 }
                 defaultImage {
                  ...ImageFields
                }
                inventory {
                  aggregated {
                    availableToSell
                    warningLevel
                  }
                  isInStock
                  hasVariantInventory
                }
                images {
                  edges {
                    node {
                      ...ImageFields
                    }
                  }
                }
                reviewSummary {
                  summationOfRatings
                  numberOfReviews
                }
            prices {
              price {
                value
                currencyCode
              }
            }
            variants {
              edges {
                node {
                  defaultImage {
                    altText
                    isDefault
                    url(width: 10, height: 10)
                    urlOriginal
                    urlTemplate
                  }
                  entityId
                  id
                  inventory {
                    isInStock
                    aggregated {
                      warningLevel
                      availableToSell
                    }
                  }
                  options {
                    edges {
                      node {
                        displayName
                        entityId
                        isRequired
                        values {
                          edges {
                            cursor
                            node {
                              entityId
                              label
                            }
                          }
                        }
                      }
                    }
                  }
                  productOptions {
                    edges {
                      node {
                        entityId
                        displayName
                        isRequired
                        isVariantOption
                      }
                      cursor
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  fragment ImageFields on Image {
    url320wide: url(width: 320)
    url640wide: url(width: 640)
    url960wide: url(width: 960)
    url1280wide: url(width: 1280)
  }`,
    variables: {}
  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: graphqlEndpoint,
    headers: api_headers,
    data: data
  };

  axios.request(config)
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      //console.log(error);
    });

});

app.all('*', (req, res) => {
  res.status(404).send('Page not found');
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  //console.log(`Proxy server listening on port ${port}`);
});
