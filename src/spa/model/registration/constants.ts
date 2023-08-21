export const options = {
  projectKey: 'ecommerce-app2023',
  scopes: ['manage_customers:ecommerce-app2023'],
  clientId: 'WU2nc9Wkm1uEmfRCSYlnrQeB',
  clientSecret: 'cJImxS1SHlLUkSJXWo_080QnWRD0gXe2',
  host: 'https://auth.europe-west1.gcp.commercetools.com',
  authMiddlewareOptions: {
    host: 'https://auth.europe-west1.gcp.commercetools.com',
    projectKey: 'ecommerce-app2023',
    credentials: {
      clientId: 'E0OJyOolk7JN4wsyvsGe3hNl',
      clientSecret: 'fv31BsGLqlnSr18dwX69PNlAV9qUBkxO',
    },
    scopes: ['manage_customers:ecommerce-app2023'],
    fetch,
  },
  httpMiddlewareOptions: {
    host: 'https://api.europe-west1.gcp.commercetools.com',
    fetch,
  },
};
