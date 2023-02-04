import './category-menu.styles.scss'
import CategoryItem from '../category-item/category-item.component'

const CategoryMenu = ({categories}) => {
    return (
        categories.map((category)=>{
            return(
                <CategoryItem key={category.id} category={category} />
            )
        })
    )
}

export default CategoryMenu;