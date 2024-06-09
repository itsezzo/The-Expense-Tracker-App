import { createContext, useReducer } from "react";

import { ITEMS } from "../data/data";

// let i = 100;

export const ExpensesContext = createContext({
    expenses: [],
    setExpense: (expense) => {},
    addExpense: ({title, date, price}) => {},
    removeExpense: (id) => {},
    updateExpense: (id, {title, date, price}) => {},
});


function expensesReducer(state, action) {
    switch(action.type) {
        case 'SET':
            const inverted = action.payload.reverse();
            return inverted;
        case 'ADD':
            // const id = i;
            return [action.payload, ...state];
        case 'UPDATE':
            const expenseIndex = state.findIndex(expense => expense.id === action.payload.id);
            const expense = state[expenseIndex];
            const updatedExpense = {...expense, ...action.payload.expensesData};
            const updatedExpenses = [...state];
            updatedExpenses[expenseIndex] = updatedExpense;
            return updatedExpenses;
        case 'DELETE':
            return state.filter(item => item.id !== action.payload);
        default:
            return state;
    }
}

export default function ExpensesContextProvider({children}) {
    const [expenseState, dispatch] = useReducer(expensesReducer, []);
    // i++;
    function setExpense(expense) {
        dispatch({type: 'SET', payload: expense});
    };

    function addExpense(expensesData) {
        dispatch({type: 'ADD', payload: expensesData});
    };

    function removeExpense(id) {
        dispatch({type: 'DELETE', payload: id});
    };
    function updateExpense(id, expensesData) {
        dispatch({type: 'UPDATE', payload: {id, expensesData}})
    };

    const value = {
        expenses: expenseState,
        setExpense: setExpense,
        addExpense: addExpense,
        removeExpense: removeExpense,
        updateExpense: updateExpense
    }

    return(
        <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>
    );
}