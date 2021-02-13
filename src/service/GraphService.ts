var instance: any = null;
export class GraphService {

    static getInstance() {
        if (instance === null) {
            instance = new GraphService();
        }
        return instance;
    }

    static setInstance(_instance: any) {
        instance = _instance;
    }

    getUser = async (graphClient: any) => {
        return await graphClient
            .api('/me')
            // Only get the fields used by the app
            .select('id,displayName,mail,userPrincipalName,mailboxSettings')
            .get();
    }
}