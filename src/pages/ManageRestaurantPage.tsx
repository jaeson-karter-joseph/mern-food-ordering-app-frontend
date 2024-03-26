import { useCreateMyRestaurant, useGetMyRestaurant, useGetMyRestaurantOrders, useUpdateMyRestaurant } from "@/api/MyRestaurantApi";
import OrderItemCard from "@/components/OrderItemCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ManageRestaurantForm from "@/forms/manage-restaurant-form/manageRestaurantForm";

const ManageRestaurantPage = () => {
    const { createRestaurant, isLoading } = useCreateMyRestaurant();
    const { updateRestaurant, isLoading: isUpdating } = useUpdateMyRestaurant();
    const { restaurant } = useGetMyRestaurant();

    const { orders } = useGetMyRestaurantOrders();

    const isEditing = !!restaurant;

    return (
        <Tabs defaultValue="orders">
            <TabsList>
                <TabsTrigger value="orders" >Order</TabsTrigger>
                <TabsTrigger value="manage-restaurant" >Manage Restaurant</TabsTrigger>
            </TabsList>
            <TabsContent value="orders" className="space-y-5 bg-gray-50 pg-10 rounded-lg">
                <h2 className="text-2xl font-bold">{orders?.length} active orders</h2>
                {orders?.map((order) => (
                    <OrderItemCard order={order} />
                ))}
            </TabsContent>
            <TabsContent value="manage-restaurant">
                <ManageRestaurantForm isLoading={isLoading || isUpdating} onSave={isEditing ? updateRestaurant : createRestaurant} restaurant={restaurant} />
            </TabsContent>


        </Tabs>
    )
}

export default ManageRestaurantPage;