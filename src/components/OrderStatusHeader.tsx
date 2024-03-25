import { Order } from "@/types";
import { Progress } from "./ui/progress";
import { ORDER_STATUS } from "@/config/order-status-config";

type Props = {
    order: Order;
}

const OrderStatusHeader = ({ order }: Props) => {

    const getExpectedDelivery = () => {
        const created = new Date(order.createdAt);
        created.setMinutes(
            created.getMinutes() + order.restaurant.estimatedDeliveryTime
        )

        const hours = created.getHours();
        const minutes = created.getMinutes();

        const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        return `${hours}:${paddedMinutes}`;
    }

    const getOrderInfo = () => {
        return ORDER_STATUS.find((status) => status.value === order.status);
    }

    return (
        <>
            <h1 className="text-4xl font-bold tracking-tighter flex flex-col gap-5 md:flex-row md:justify-between">
                <span className="">Order Status: {getOrderInfo()?.label}</span>
                <span className="">Expected By: {getExpectedDelivery()}</span>

            </h1>
            <Progress className="animate-pulse" value={getOrderInfo()?.progressValue} />
        </>
    )

}

export default OrderStatusHeader;