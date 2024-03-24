import { useCreateMyRestaurant, useGetMyRestaurant } from "@/api/MyRestaurantApi";
import ManageRestaurantForm from "@/forms/manage-restaurant-form/manageRestaurantForm";

const ManageRestaurantPage = () => {
    const { createRestaurant, isLoading } = useCreateMyRestaurant();
    const { restaurant } = useGetMyRestaurant();

    return (
        <ManageRestaurantForm isLoading={isLoading} onSave={createRestaurant} restaurant={restaurant} />
    )
}

export default ManageRestaurantPage;