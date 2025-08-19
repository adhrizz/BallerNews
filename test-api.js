const axios = require('axios');
const config = require('./config');

async function testAPI() {
    console.log('🔍 Testing Football API Configuration...\n');
    
    // Test API-Football
    console.log('Testing API-Football...');
    try {
        const response = await axios.get(`${config.footballAPI.baseURL}/leagues`, {
            headers: {
                'x-rapidapi-key': config.footballAPI.key,
                'x-rapidapi-host': config.footballAPI.host
            },
            params: { country: 'England' }
        });
        
        if (response.data && response.data.response) {
            console.log('✅ API-Football is working!');
            console.log(`Found ${response.data.response.length} leagues`);
        } else {
            console.log('❌ API-Football returned no data');
        }
    } catch (error) {
        console.log('❌ API-Football error:', error.message);
        if (error.response && error.response.status === 401) {
            console.log('   This usually means your API key is invalid or missing');
        }
    }
    
    console.log('\n' + '='.repeat(50) + '\n');
    
    // Test Football-Data.org
    console.log('Testing Football-Data.org...');
    try {
        const response = await axios.get(`${config.footballDataAPI.baseURL}/competitions`, {
            headers: {
                'X-Auth-Token': config.footballDataAPI.key
            }
        });
        
        if (response.data && response.data.competitions) {
            console.log('✅ Football-Data.org is working!');
            console.log(`Found ${response.data.competitions.length} competitions`);
        } else {
            console.log('❌ Football-Data.org returned no data');
        }
    } catch (error) {
        console.log('❌ Football-Data.org error:', error.message);
        if (error.response && error.response.status === 401) {
            console.log('   This usually means your API key is invalid or missing');
        }
    }
    
    console.log('\n' + '='.repeat(50));
    console.log('\n📝 Next Steps:');
    console.log('1. If you see ✅ messages, your API is working!');
    console.log('2. If you see ❌ messages, check your API key in config.js');
    console.log('3. Run "npm start" to start your football app');
    console.log('4. Visit http://localhost:3000 to test the web interface');
}

// Run the test
testAPI().catch(console.error); 