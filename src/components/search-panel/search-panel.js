import { Component } from 'react';
import './search-panel.css';

class SearchPanel extends Component {
    constructor(props){
        super(props);
        this.state = {
            term: ''
        }
    }
    onUpdateSearch = (e) => {
        const term = e.target.value;
        this.setState({term});
        this.props.onUpdateSearch(term);
    }
    render(){
        return (
            <input type = 'text' className = 'form-control search-input'
              placeholder = 'Найти сотрудника' 
              value = {this.state.term}
              onChange={this.onUpdateSearch}/>
        );
    }
}
//Функциональный компонент
// const SearchPanel = () => {
//     return (
//         <input type = 'text' className = 'form-control search-input'
//         placeholder = 'Найти сотрудника' />
//     );
// };

export default SearchPanel;