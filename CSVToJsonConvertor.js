const CsvVisitor = require('./lang/CSVVisitor').CSVVisitor;
const CsvLexer = require('./lang/CSVLexer').CSVLexer;
const CsvParser = require('./lang/CSVParser').CSVParser;
 class CsvToJsonConverter extends CsvVisitor {
    constructor() {
        super();
        this.header = []; // holds the header values
        this.currentRowValues = []; // holds the values of the current row
        this.output = [];
    }
    
    // The axiom's action is going to be invoked first.
    visitCsvFile(ctx) { 
        this.visitChildren(ctx);
        return this.output;
    }
    
    visitHdr(ctx) {
        this.visitChildren(ctx);
        // After traversing the 'hdr' subtree we store the values
        this.header = this.currentRowValues;
    }

    visitRow(ctx) {
        // Clear values added from the previous row node
        this.currentRowValues = [];
        // Traverse the subtree and collect the field values
        this.visitChildren(ctx);
        
        // Construct an object from a row in case is's not a header row
        if (ctx.parentCtx.ruleIndex !== CsvParser.RULE_hdr) {
            const item = {};
            this.currentRowValues.forEach((val, index) => {
                /* The header row is already visited because 
                   it is always the lefmost row node in the tree */
                const key = this.header[index];
                return item[key] = val;
            });
            this.output.push(item);
        }
    }

    visitField(ctx) {
        // When we visit a 'field' node, we simply store its text
        this.currentRowValues.push(ctx.getText().trim());
    }
}
exports.CsvToJsonConverter=CsvToJsonConverter;