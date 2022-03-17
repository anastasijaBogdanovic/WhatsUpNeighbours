using System.Threading.Tasks;
using backend.dtos;
using Microsoft.AspNetCore.SignalR;
using Microsoft.AspNetCore.Mvc;
using backend.Hubs.Clients;

namespace backend.Hubs
{
    //treba da se stavi u <> IChatClient
    public class NotificationHub : Hub<INotificationClient>
    {
       


    }

}