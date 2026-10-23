import { Component } from 'react';
import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployersList from '../employers-list/employers-list';
import EmployersAddForm from '../employers-add-form/employers-add-form';
import './app.css';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: [
                {name: 'Дмитрий В.', salary: 800, increase: false, rise: true, id: 1},
                {name: 'Петр И.', salary: 3000, increase: true, rise: false, id: 2},
                {name: 'Владислав В.', salary: 5000, increase: false, rise: false, id: 3}
            ],
            term: '',
            filter: 'all'
        };
        this.maxId = 4;
    }
    // 1. Вызывается автоматически сразу после отрисовки компонента. 
    // Мы берем данные из памяти браузера, если они там есть.
    componentDidMount() {
        const savedData = localStorage.getItem('employeesData');
        if (savedData) {
            this.setState({ data: JSON.parse(savedData) });
        }
    }

    // 2. Вызывается автоматически при любом изменении стейта (добавили, удалили, изменили зп).
    // Мы перезаписываем актуальный массив в память браузера.
    componentDidUpdate(prevProps, prevState) {
        if (prevState.data !== this.state.data) {
            localStorage.setItem('employeesData', JSON.stringify(this.state.data));
        }
    }
    deleteItem = (id) => { //Два способа удаления сотрудника из списка
        this.setState(({data}) => {
            //const index = data.findIndex(elem => elem.id === id);
            //const before = data.slice(0, index);
            //const after = data.slice(index + 1);
            //const newArray = [...before, ...after];
            return {
                data: data.filter(item => item.id !== id)
            }
        });
    }
    addItem = (name, salary) => { //Добавляем нового сотруника в список
        const newItem = {
            name,
            salary,
            increase: false,
            rise: false,
            id: this.maxId++
        }
        this.setState(({data}) => {
            const newArr = [...data, newItem];
            return {
                data: newArr
            }
        });
    }
    //Заменяем на onToggleProp
    // onToggleIncrease = (id) => {
    // //Первый способ    
    // //    this.setState(({data}) => {
    // //         //Получаем индекс элемента, с которым будем работать
    // //         const index = data.findIndex(elem => elem.id === id); 
    // //         //Берем объект с index и делаем его копию, Чтобы можно было что-то в нем менять
    // //         const old = data[index]; //Сохраняем промежуточный результат
    // //         const newItem = {...old, increase: !old.increase};
    // //         const newArr = [...data.slice(0, index), newItem, ...data.slice(index+1)];

    // //         return {
    // //             data: newArr
    // //         }
    // //    });
    // //Второй способ
    //     this.setState(({data}) => ({
    //         data: data.map(item => {
    //             if(item.id === id){
    //                 return {...item, increase: !item.increase}
    //             }
    //             return item;
    //         })
    //     }));
    // }
    //Заменяем на onToggleProp
    // onToggleRise = (id) => {
    //     this.setState(({data}) => ({
    //         data: data.map(item => {
    //             if(item.id === id){
    //                 return {...item, rise: !item.rise}
    //             }
    //             return item;
    //         })
    //     }));
    // }
    onToggleProp = (id, prop) => {
        this.setState(({data}) => ({
            data: data.map(item => {
                if(item.id === id){
                    return {...item, [prop]: !item[prop]};
                } 
                return item;
            })
        }));
    }
    searchEmp = (items, term) => {
        if(term.length === 0){
            return items;
        }
        return items.filter(item => {
            return item.name.indexOf(term) > -1;
        });
    }
    onUpdateSearch = (term) => {
        this.setState({term});
    }
    filterPost = (items, filter) => {
        switch(filter){
            case 'rise': return items.filter(item => item.rise);
            case 'moreThan1000': return items.filter(item => item.salary > 1000);
            default: return items;
        }
    }
    onFilterSelect = (filter) => {
        this.setState({filter});
    }
    render(){
        const {data, term, filter} = this.state;
        const employees = this.state.data.length;
        const increased = this.state.data.filter(item => item.increase).length;
        const visibleData = this.filterPost(this.searchEmp(data, term), filter);
        return (
            <div className='app'>
                <AppInfo employees = {employees} increased = {increased}/>

                <div className = 'search-panel'>
                    <SearchPanel onUpdateSearch = {this.onUpdateSearch}/>
                    <AppFilter filter = {filter} onFilterSelect = {this.onFilterSelect}/>
                </div>

                <EmployersList data = {visibleData} onDelete = {this.deleteItem}
                               onToggleProp = {this.onToggleProp}
                               />
                <EmployersAddForm onAdd = {this.addItem}/>
            </div>
        );
    }
}

// function App(){
//     const data = [
//         {name: 'John C.', salary: 800, increase: false, id: 1},
//         {name: 'Alex M.', salary: 3000, increase: true, id: 2},
//         {name: 'Carl W.', salary: 5000, increase: false, id: 3}
//     ];

//     return (
//         <div className='app'>
//             <AppInfo />

//             <div className = 'search-panel'>
//                 <SearchPanel/>
//                 <AppFilter/>
//             </div>

//             <EmployersList data = {data} onDelete = {id => console.log(id)}/>
//             <EmployersAddForm/>
//         </div>
//     );
// }

export default App;