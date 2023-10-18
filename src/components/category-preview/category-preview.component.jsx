import "./category-preview.styles";
import ProductCard from "../product-card/product-card.component";
import { CategoryPreviewContainer, Preview, Title } from "./category-preview.styles";

const CategoryPreview = ({ title, products }) => {
  const productsToDisplay = products.slice(0, 4);

  return (
    <CategoryPreviewContainer>
      <h2>
        <Title to={title}>{title.toUpperCase()}</Title>
      </h2>
      <Preview>
        {productsToDisplay.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Preview>
    </CategoryPreviewContainer>
  );
};

export default CategoryPreview;
