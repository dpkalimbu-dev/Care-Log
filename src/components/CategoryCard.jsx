import "./CategoryCard.css";

function CategoryCard({ label, onClick }){
    return (
        <div className="category-card" onClick={onClick}>
        <p className="category-label">{label}</p> 
        </div>
    );
};

export default CategoryCard;