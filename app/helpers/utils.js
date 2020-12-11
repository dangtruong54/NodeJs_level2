let createFilterStatus =  async (currentStatus, collection) => {
    let statusFilter = [
		{name: 'All', value: 'all', count: 0, class: 'default'},
		{name: 'Active', value: 'active',  count: 0, class: 'default'},
		{name: 'InActive', value: 'inactive',  count: 0, class: 'default'}
	];

	for(let index = 0; index < statusFilter.length; index++) {
		let item = statusFilter[index];
		let condition = (item.value !== "all") ? {status: item.value} : {};
		if(item.value === currentStatus) statusFilter[index].class = 'success';
		switch (collection) {
			case 'items':
				const ItemsModel = require(__path_schemas +  'items');
				await ItemsModel.countDocuments(condition).then( (data) => {
					statusFilter[index].count = data;
				});
				break;
			case 'group':
				const GroupModel = require(__path_schemas +  'group');
				await GroupModel.countDocuments(condition).then( (data) => {
					statusFilter[index].count = data;
				});
				break;
			case 'users':
				const UserModel = require(__path_schemas +  'users');
				await UserModel.countDocuments(condition).then( (data) => {
					statusFilter[index].count = data;
				});
				break;
		}
	}

    return statusFilter;
}

module.exports = {
    createFilterStatus: createFilterStatus
}
