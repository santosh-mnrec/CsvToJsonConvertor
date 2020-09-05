const antlr = require('antlr4');
const CsvLexer = require('./lang/CSVLexer').CSVLexer;
const CsvParser = require('./lang/CSVParser').CSVParser;

const CSVToJsonConvertor=require("./CSVToJsonConvertor").CsvToJsonConverter;

const input = `REVIEW_DATE, AUTHOR, ISBN, DISCOUNTED_PRICE
1985/01/21, Douglas Adams, 0345391802, 5.95
1990/01/12, Douglas Hofstadter, , 
`;
const chars = new antlr.InputStream(input);
const lexer = new CsvLexer(chars);
const tokens = new antlr.CommonTokenStream(lexer);
const parser = new CsvParser(tokens);
const tree = parser.csvFile(); // parse fr

const result = tree.accept(new CSVToJsonConvertor());
console.log(result);