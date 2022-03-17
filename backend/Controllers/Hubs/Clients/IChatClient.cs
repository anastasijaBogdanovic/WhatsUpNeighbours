using System.Threading.Tasks;
using backend.dtos;

namespace backend.Hubs.Clients
{
    public interface IChatClient
    {
        Task ReceiveMessage(Message poruka);
    }

}