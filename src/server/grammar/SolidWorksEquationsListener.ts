// Generated from SolidWorksEquations.g4 by ANTLR 4.12.0

import {ParseTreeListener} from "antlr4";


import { EquationsContext } from "./SolidWorksEquationsParser";
import { EquationContext } from "./SolidWorksEquationsParser";
import { VariableDeclarationContext } from "./SolidWorksEquationsParser";
import { PropertyAssignmentContext } from "./SolidWorksEquationsParser";
import { ExpressionContext } from "./SolidWorksEquationsParser";


/**
 * This interface defines a complete listener for a parse tree produced by
 * `SolidWorksEquationsParser`.
 */
export default class SolidWorksEquationsListener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by `SolidWorksEquationsParser.equations`.
	 * @param ctx the parse tree
	 */
	enterEquations?: (ctx: EquationsContext) => void;
	/**
	 * Exit a parse tree produced by `SolidWorksEquationsParser.equations`.
	 * @param ctx the parse tree
	 */
	exitEquations?: (ctx: EquationsContext) => void;
	/**
	 * Enter a parse tree produced by `SolidWorksEquationsParser.equation`.
	 * @param ctx the parse tree
	 */
	enterEquation?: (ctx: EquationContext) => void;
	/**
	 * Exit a parse tree produced by `SolidWorksEquationsParser.equation`.
	 * @param ctx the parse tree
	 */
	exitEquation?: (ctx: EquationContext) => void;
	/**
	 * Enter a parse tree produced by `SolidWorksEquationsParser.variableDeclaration`.
	 * @param ctx the parse tree
	 */
	enterVariableDeclaration?: (ctx: VariableDeclarationContext) => void;
	/**
	 * Exit a parse tree produced by `SolidWorksEquationsParser.variableDeclaration`.
	 * @param ctx the parse tree
	 */
	exitVariableDeclaration?: (ctx: VariableDeclarationContext) => void;
	/**
	 * Enter a parse tree produced by `SolidWorksEquationsParser.propertyAssignment`.
	 * @param ctx the parse tree
	 */
	enterPropertyAssignment?: (ctx: PropertyAssignmentContext) => void;
	/**
	 * Exit a parse tree produced by `SolidWorksEquationsParser.propertyAssignment`.
	 * @param ctx the parse tree
	 */
	exitPropertyAssignment?: (ctx: PropertyAssignmentContext) => void;
	/**
	 * Enter a parse tree produced by `SolidWorksEquationsParser.expression`.
	 * @param ctx the parse tree
	 */
	enterExpression?: (ctx: ExpressionContext) => void;
	/**
	 * Exit a parse tree produced by `SolidWorksEquationsParser.expression`.
	 * @param ctx the parse tree
	 */
	exitExpression?: (ctx: ExpressionContext) => void;
}

