export const swaggerDocument = {
  openapi: '3.0.1',
  info: {
    description: 'ReflexaWeb - API',
    version: '1.0.0',
    title: 'ReflexaWeb'
  },
  basePath: '/api/v1',
  tags: {
    name: 'products',
    description: 'Products management'
  },
  parameters: {
    code: {
      name: 'code',
      in: 'path',
      description: 'Corpo da requisição para criação de um novo produto',
      required: true,
      type: 'string'
    }
  },
  paths: {
    '/products': {
      get: {
        tags: ['products'],
        summary: 'Listar produtos',
        description: 'Listar produtos',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  $ref: '#/definitions/ProductResponse'
                }
              }
            }
          }
        },
        responses: {
          200: {
            description: 'Operation succesful'
          },
          500: {
            description: 'Internal server error'
          }
        }
      },
      post: {
        tags: ['products'],
        summary: 'Cadastrar novo produto',
        description: 'Cadastrar novo produto',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/definitions/ProductPayload'
              }
            }
          }
        },
        responses: {
          201: {
            description: 'Created'
          },
          400: {
            description: 'Bad Request'
          },
          422: {
            description: 'Unprocessable Entity'
          },
          500: {
            description: 'Internal server error'
          }
        }
      }
    },
    '/products/{code}': {
      get: {
        tags: ['products'],
        summary: 'Listar produto por código',
        description: 'Listar produto por código',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/definitions/ProductResponse'
              }
            }
          }
        },
        responses: {
          200: {
            description: 'Success'
          },
          404: {
            description: 'Product not found'
          },
          500: {
            description: 'Internal server error'
          }
        }
      },
      put: {
        tags: ['products'],
        summary: 'Atualizar produto',
        description: 'Atualizar produto',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/definitions/ProductPayload'
              }
            }
          }
        },
        responses: {
          200: {
            description: 'Success'
          },
          400: {
            description: 'Bad Request'
          },
          404: {
            description: 'Product not found'
          },
          500: {
            description: 'Internal server error'
          }
        }
      }
    }
  },
  definitions: {
    ProductPayload: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description: 'Nome do produto'
        },
        code: {
          type: 'string',
          description: 'Código do produto'
        },
        unity: {
          type: 'string',
          description: 'Quantidade do produto (em unidades)'
        },
        fraction: {
          type: 'string',
          description: 'Quantidade do produto (fracionado) - OPCIONAL'
        },
        product_url: {
          type: 'string',
          description: 'URL da imagem do produto'
        }
      },
      parameters: [
        {
          name: 'name',
          in: 'body',
          description: 'Nome',
          required: true,
          type: 'string'
        },
        {
          name: 'code',
          in: 'body',
          description: 'Código',
          required: true,
          type: 'string'
        },
        {
          name: 'unity',
          in: 'body',
          description: 'Unidade',
          required: true,
          type: 'string'
        },
        {
          name: 'fraction',
          in: 'body',
          description: 'Quantidade do produto (se fracionado)',
          type: 'string'
        },
        {
          name: 'product_url',
          in: 'body',
          description: 'URL da imagem do produto',
          required: true,
          type: 'string',
          example: 'http://site.com/url-da-imagem.png'
        }
      ]
    },
    ProductResponse: {
      type: 'object',
      parameters: [
        {
          name: 'id',
          type: 'integer',
          required: true
        },
        {
          name: 'name',
          type: 'string',
          required: true
        },
        {
          name: 'unity',
          type: 'string',
          required: true
        },
        {
          name: 'fraction',
          type: 'string',
          required: true
        },
        {
          name: 'product_url',
          required: true,
          type: 'string',
          example: 'http://site.com/url-da-imagem.png'
        },
        {
          name: 'created_at',
          required: true,
          example: '2021-09-28T12:00:00:123Z',
          format: 'date'
        },
        {
          name: 'updated_at',
          required: true,
          example: '2021-09-28T12:00:00:123Z',
          format: 'date'
        }
      ],
      properties: {
        id: {
          type: 'integer',
          description: 'ID do produto no banco de dados'
        },
        name: {
          type: 'string',
          description: 'Nome do produto'
        },
        code: {
          type: 'string',
          description: 'Código de identificação do produto'
        },
        unity: {
          type: 'string',
          description: 'Quantidade (em unidades) do produto',
          example: '3 unidades'
        },
        fraction: {
          type: 'string',
          description: 'Quantidade (em fração) do produto',
          example: '0.5'
        },
        product_url: {
          type: 'string',
          description: 'URL da imagem do produto',
          example: 'http://site.com/url-da-imagem.png'
        },
        created_at: {
          type: 'string',
          description: 'Data de criação do registro',
          example: '2021-09-28T12:00:00:123Z',
          format: 'date'
        },
        updated_at: {
          type: 'string',
          description: 'Data de atualização do registro',
          example: '2021-09-28T12:00:00:123Z',
          format: 'date'
        }
      }
    }
  }
}
