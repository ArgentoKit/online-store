import { CategoryList } from "@/entities/category/category-list";
import { Sidebar } from "@/widgets/sidebar";

export default async function Home() {
  return <div className='container'>
    <Sidebar>
      <CategoryList />
    </Sidebar>
  </div>
}