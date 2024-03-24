import { useCreateMyRestaurant } from "@/api/MyRestaurantApi";
import ManageRestaurantForm from "@/forms/manage-restaurant-form/manageRestaurantForm";

const ManageRestaurantPage = () => {
    const { createRestaurant, isLoading } = useCreateMyRestaurant();
    return (
        <ManageRestaurantForm isLoading={isLoading} onSave={createRestaurant} />
    )
}

export default ManageRestaurantPage;