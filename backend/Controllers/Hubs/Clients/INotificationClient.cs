using System.Threading.Tasks;
using backend.dtos;

namespace backend.Hubs.Clients
{
    public interface INotificationClient
    {
        Task ReceiveNotification(NotificationDto notifikacija);
    }

}