const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

async function main(name) {
  // Find the name in the list, create a merkle tree and the proof
  const index = niceList.findIndex(n => n === name);
  const merkleTree = new MerkleTree(niceList);
  const proof = merkleTree.getProof(index);

  // Send the name and proof to the server
  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    proof: proof,
    name: name,
  });

  console.log({ gift });
}

main("Norman Block");