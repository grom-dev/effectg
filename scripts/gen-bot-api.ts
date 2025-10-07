import type { ValueType } from '@grom.js/bot-api-spec'
import type { SourceFile } from 'ts-morph'
import { methods, types } from '@grom.js/bot-api-spec'
import { Project, Writers } from 'ts-morph'

async function main() {
  const proj = new Project()
  genTypes(proj.createSourceFile('./src/bot-api/internal/types.gen.ts', {}, { overwrite: true }))
  genMethods(proj.createSourceFile('./src/bot-api/internal/methods.gen.ts', {}, { overwrite: true }))
  genBotApi(proj.createSourceFile('./src/bot-api/internal/botApi.gen.ts', {}, { overwrite: true }))
  await proj.save()
}

function genTypes(f: SourceFile): void {
  const opts: GenValueTypeOptions = {
    apiType: name => name,
    inputFile: 'UNEXPECTED',
  }
  for (const type of Object.values(types)) {
    if (type.fields) {
      f.addInterface({
        isExported: true,
        isDefaultExport: false,
        name: type.name,
        docs: [type.description.markdown],
        properties: type.fields.map(field => ({
          name: field.name,
          type: genValueType(field.type, opts),
          hasQuestionToken: !field.required,
          docs: [field.description.markdown],
        })),
      })
    }
    else {
      f.addTypeAlias({
        isExported: true,
        isDefaultExport: false,
        name: type.name,
        docs: [type.description.markdown],
        type: genValueType({ type: 'union', types: type.oneOf }, opts),
      })
    }
  }
}

function genMethods(f: SourceFile): void {
  const opts: GenValueTypeOptions = {
    apiType: name => `Types.${name}`,
    inputFile: 'InputFile',
  }
  f.addImportDeclaration({
    moduleSpecifier: './types.gen.ts',
    isTypeOnly: true,
    namespaceImport: 'Types',
  })
  f.addImportDeclaration({
    moduleSpecifier: '../InputFile.ts',
    isTypeOnly: true,
    namedImports: ['InputFile'],
  })
  const iParams = f.addInterface({
    name: 'MethodParams',
    isExported: true,
    isDefaultExport: false,
  })
  const iResults = f.addInterface({
    name: 'MethodResults',
    isExported: true,
    isDefaultExport: false,
  })
  for (const { name, parameters, returnType } of Object.values(methods)) {
    const paramsOptional = !(parameters.some(({ required }) => required))
    const typeSrc = parameters.length > 0
      ? Writers.objectType({
          properties: parameters
            .map(param => ({
              name: param.name,
              docs: [param.description.markdown],
              type: genValueType(param.type, opts),
              hasQuestionToken: !param.required,
            })),
        })
      : 'Record<string, never>'
    iParams.addProperty({
      name,
      type: paramsOptional ? Writers.unionType('void', typeSrc) : typeSrc,
    })
    iResults.addProperty({
      name,
      hasQuestionToken: false,
      type: genValueType(returnType, opts),
    })
  }
}

function genBotApi(f: SourceFile): void {
  f.addImportDeclarations([
    {
      isTypeOnly: true,
      namedImports: ['BotApiMethod'],
      moduleSpecifier: './botApiMethod',
    },
  ])
  f.addInterface({
    isExported: true,
    isDefaultExport: false,
    name: 'BotApi',
    properties: Object
      .values(methods)
      .map(({ name, description }) => ({
        name,
        docs: [description.markdown],
        type: `BotApiMethod<'${name}'>`,
      })),
  })
}

interface GenValueTypeOptions {
  inputFile: string
  apiType: (name: string) => string
}

function genValueType(
  t: ValueType,
  options: GenValueTypeOptions,
): string {
  switch (t.type) {
    case 'str':
      return t.literal != null
        ? `"${t.literal}"`
        : 'string'
    case 'bool':
      return t.literal != null
        ? `${t.literal}`
        : 'boolean'
    case 'int32':
      return t.literal != null
        ? `${t.literal}`
        : 'number'
    case 'int53':
    case 'float':
      return 'number'
    case 'input-file':
      return options.inputFile
    case 'api-type':
      return options.apiType(t.name)
    case 'array':
      return `Array<${genValueType(t.of, options)}>`
    case 'union':
      return `${t.types.map(t => genValueType(t, options)).join(' | ')}`
  }
}

if (import.meta.main) {
  await main()
}
