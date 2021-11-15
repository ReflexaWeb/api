export const swaggerDocument = {
  openapi: '3.0.1',
  info: {
    description: 'ReflexaWeb - API',
    version: '1.0.0',
    title: 'ReflexaWeb'
  },
  schemes: ['http', 'https'],
  tags: {
    name: 'Products',
    description: 'Products management'
  },
  parameters: {
    code: {
      name: 'code',
      in: 'path',
      description: 'Código do produto',
      required: true,
      type: 'string'
    },
    group_code: {
      name: 'group_code',
      in: 'path',
      description: 'Código do grupo',
      required: true,
      type: 'string'
    }
  },
  paths: {
    '/api/v1/products': {
      get: {
        tags: ['Products'],
        summary: 'Listar produtos',
        description: 'Listar produtos',
        type: 'array',
        items: {
          $ref: '#/definitions/ProductResponse'
        },
        responses: {
          200: {
            description: 'Operation succesful',
            schema: {
              $ref: '#/definitions/ProductPayload'
            }
          },
          500: {
            description: 'Internal server error'
          }
        }
      },
      post: {
        tags: ['Products'],
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
    '/api/v1/products/{code}': {
      get: {
        tags: ['Products'],
        summary: 'Listar produto por código',
        description: 'Listar produto por código',
        parameters: [{
          $ref: '#/parameters/code'
        }],
        type: 'array',
        items: {
          $ref: '#/definitions/ProductResponse'
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
        tags: ['Products'],
        summary: 'Atualizar produto',
        description: 'Atualizar produto',
        parameters: [{
          $ref: '#/parameters/code'
        }],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/definitions/PostProductPayload'
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
    },
    '/api/v1/products/groups/{group_code}': {
      get: {
        tags: ['Products'],
        summary: 'Listar produtos por código do grupo',
        description: 'Listar produtos por código do grupo',
        parameters: [{
          $ref: '#/parameters/group_code'
        }],
        type: 'array',
        items: {
          $ref: '#/definitions/ProductResponse'
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
      }
    },
    '/api/v1/groups': {
      get: {
        tags: ['Groups'],
        summary: 'Listar grupos',
        description: 'Listar grupos',
        type: 'array',
        items: {
          $ref: '#/definitions/ProductResponse'
        },
        responses: {
          200: {
            description: 'Operation succesful',
            schema: {
              $ref: '#/definitions/GroupResponse'
            }
          },
          500: {
            description: 'Internal server error'
          }
        }
      },
      post: {
        tags: ['Groups'],
        summary: 'Cadastrar novo grupo',
        description: 'Cadastrar novo grupo',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/definitions/GroupPayload'
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
    '/api/v1/groups/{code}': {
      put: {
        tags: ['Groups'],
        summary: 'Atualizar grupo',
        description: 'Atualizar grupo',
        parameters: [{
          $ref: '#/parameters/code'
        }],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/definitions/GroupPayload'
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
    PostProductPayload: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description: 'Nome do produto',
          example: 'Produto 1'
        },
        code: {
          type: 'string',
          description: 'Código do produto',
          example: '001'
        },
        reference: {
          type: 'string',
          description: 'Referência do produto',
          example: '100 PCT'
        },
        unity: {
          type: 'string',
          description: 'Quantidade do produto (em unidades)',
          example: '12'
        },
        fraction: {
          type: 'string',
          description: 'Quantidade do produto (fracionado) - OPCIONAL',
          example: '1'
        },
        product_url: {
          type: 'string',
          description: 'URL da imagem do produto',
          example: 'http://site.com/url-da-imagem.png'
        },
        group_code: {
          type: 'string',
          description: 'Código do grupo',
          example: '001'
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
    GroupPayload: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description: 'Nome do produto',
          example: 'Produto 1'
        },
        code: {
          type: 'string',
          description: 'Código do produto',
          example: '001'
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
          name: 'reference',
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
          name: 'active',
          type: 'boolean',
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
        reference: {
          type: 'string',
          description: 'Referência do produto',
          example: '3 unidades'
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
        active: {
          type: 'boolean',
          description: 'Indica se o produto está ativo ou não para aparecer no site',
          example: 'true'
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
    },
    GroupResponse: {
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
          name: 'code',
          type: 'string',
          required: true
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
          description: 'ID do grupo no banco de dados'
        },
        name: {
          type: 'string',
          description: 'Nome do grupo'
        },
        code: {
          type: 'string',
          description: 'Código de identificação do grupo'
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
